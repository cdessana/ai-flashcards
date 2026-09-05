import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai';
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

if (!process.env.GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY is missing from .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const flashcardSchema: Schema = {
    type: SchemaType.ARRAY,
    description: "A list of flashcards generated from the text.",
    items: {
        type: SchemaType.OBJECT,
        properties: {
            front: { type: SchemaType.STRING, description: "The question." },
            back: { type: SchemaType.STRING, description: "The answer." }
        },
        required: ["front", "back"]
    }
};

app.post('/api/generate', upload.single('document'), async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No document file uploaded.' });
            return;
        }

        console.log("Extracting text using Mozilla PDF.js...");
        
        // 1. Extract text using pdfjs-dist
        const data = new Uint8Array(req.file.buffer);
        const loadingTask = pdfjsLib.getDocument({ data });
        const pdfDocument = await loadingTask.promise;
        
        let extractedText = '';
        const numPages = pdfDocument.numPages;

        for (let i = 1; i <= numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            extractedText += pageText + '\n';
        }

        console.log(`Extracted ${extractedText.length} characters of text.`);

        if (!extractedText.trim()) {
            res.status(422).json({ error: 'Could not extract text. The PDF might be a scanned image.' });
            return;
        }

        // 2. Configure Gemini
        const model = genAI.getGenerativeModel({
            model: 'gemini-3.7-flash', 
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: flashcardSchema,
                temperature: 0.2,
            }
        });

        
        console.log("\n--- EXACT TEXT EXTRACTED FROM PDF ---");
        console.log(extractedText);
        console.log("-------------------------------------\n");

        // 3. Prompt Gemini with the ACTUAL text
        const prompt = `
        You are an expert tutor tasked with creating high-yield study flashcards.
        Read the following source text and extract the 10 most critical concepts.
        Create a flashcard for each concept. The front should be a clear question, and the back must be the factual answer based ONLY on the provided text.

        Source Text:
        ${extractedText}
        `;

        console.log("Sending text to Gemini...");
        const geminiResponse = await model.generateContent(prompt);
        
        const rawJsonString = geminiResponse.response.text();
        const flashcards = JSON.parse(rawJsonString);

        res.json(flashcards);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to process document.' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});