# 🧠 AI Flashcard Generator

A full-stack study project that turns PDF documents into concise flashcards using generative AI.

The project was created as a hands-on exercise to understand how traditional web applications can integrate with large language models and use them to process document content in a structured way.

Its main inspiration is the **flashcard generation experience from NotebookLM**. The goal is not to reproduce NotebookLM itself, but to build a simpler version of that study workflow while exploring concepts such as prompt design, structured outputs, document processing, context management, source grounding, and retrieval.

---

## 🎯 Project Goals

This is primarily a **learning project focused on AI engineering and LLM integration**.

The application is being developed incrementally so that each new feature introduces a different concept commonly found in AI-enabled applications.

The main goals are to practice:

* Connecting a backend application to a generative AI model
* Sending document context to an LLM
* Designing prompts for specific tasks
* Requesting structured responses from AI models
* Validating model-generated output before using it in the application
* Processing PDF documents
* Understanding context-window and token limitations
* Experimenting with document chunking strategies
* Connecting generated content back to its source
* Comparing different AI providers and models
* Exploring embeddings, semantic retrieval, and RAG
* Building a simple study experience on top of AI-generated content

---

## ✨ Current Features

### 📄 PDF Text Extraction

Extracts text from multi-page PDF documents using Mozilla's [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist).

The PDF is processed by the backend and its extracted text is used as context for flashcard generation.

### 🤖 AI-Powered Flashcard Generation

Uses Google Gemini to analyze the extracted document content and generate **10 study flashcards** containing the most relevant concepts.

Each flashcard contains:

* a question
* a concise answer based on the provided document

### 🧩 Structured AI Output

The application uses Gemini's structured JSON output capabilities to enforce a predictable flashcard format.

The current structure is:

```json
[
  {
    "front": "Question",
    "back": "Answer"
  }
]
```

This makes the generated output easier to consume and render on the frontend.

### 🃏 Interactive Flashcards

The React frontend displays the generated content as interactive cards.

Users can click a card to flip between the question and the answer.

### 💻 Local Development

The frontend and backend run locally.

The application uses the developer's own Gemini API key.

PDF parsing happens locally in the backend. The extracted document text required for generation is then sent to the Gemini API.

---

## 🏗️ Current Architecture

```text
PDF Upload
    │
    ▼
React Frontend
    │
    ▼
Express Backend
    │
    ▼
PDF Text Extraction
(pdfjs-dist)
    │
    ▼
Extracted Document Text
    │
    ▼
Prompt + Structured Schema
    │
    ▼
Gemini API
    │
    ▼
Structured Flashcard JSON
    │
    ▼
React Flashcard UI
```

At the current stage, the entire extracted document text is sent to the model in a single request.

This works well for smaller documents and provides a simple baseline for future experiments with context management and document chunking.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS3

### Backend

* Node.js
* Express
* TypeScript

### Document Processing

* Multer
* `pdfjs-dist`

### AI Integration

* Google Gemini API
* `@google/generative-ai`

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js v24+
* A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

---

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-flashcards.git
cd ai-flashcards
```

Replace `yourusername` with the correct GitHub username or repository URL.

---

## 2. Backend Setup

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=8080
GEMINI_API_KEY=your_google_ai_key_here
```

> ⚠️ Never commit API keys or `.env` files to version control.

Make sure `.env` is included in `.gitignore`.

---

## 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

---

## 💻 Running Locally

The backend and frontend need to run simultaneously.

### Terminal 1 — Backend

From the project root:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8080
```

### Terminal 2 — Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend will typically run at:

```text
http://localhost:5173
```

Open the frontend URL in your browser, select a text-based PDF, and click **Generate Flashcards**.

---

## ⚠️ Current Limitations

The project is intentionally still small, since new capabilities are being added as learning exercises.

Current limitations include:

* The application works best with text-based PDFs
* Scanned documents are not supported yet
* The full extracted document is currently sent in a single LLM request
* Large documents may exceed practical context limits
* The number of generated cards is currently fixed
* Flashcards do not currently include references to their source pages
* There is no persistent storage
* Generated flashcards are not yet automatically validated beyond the model's structured response format
* Only one AI provider is currently supported

These limitations are also useful starting points for future experiments.

---

# 🧪 Learning Roadmap

Rather than treating the project as a finished product, it is being used as a small playground for exploring different AI engineering concepts.

## 01 — Basic LLM Integration ✅

```text
PDF
 ↓
Text Extraction
 ↓
Prompt
 ↓
Gemini
 ↓
Structured JSON
 ↓
Flashcards
```

Concepts explored:

* API integration
* Prompt construction
* LLM request/response flow
* Structured outputs

---

## 02 — Application Structure

Separate the current backend responsibilities into dedicated modules.

Planned structure:

```text
src/
├── routes/
│   └── flashcards.route.ts
│
├── services/
│   ├── pdf.service.ts
│   └── flashcard.service.ts
│
├── ai/
│   ├── gemini.client.ts
│   ├── flashcard.schema.ts
│   └── prompts/
│       └── flashcard.prompt.ts
│
└── types/
    └── flashcard.ts
```

Concepts to explore:

* separation of concerns
* provider abstraction
* testability
* cleaner AI integration boundaries

---

## 03 — Output Validation

Add runtime validation for model-generated responses.

Possible approach:

```text
Gemini Response
      ↓
Structured JSON
      ↓
Runtime Schema Validation
      ↓
Application
```

This experiment will explore the idea that **LLM output should still be treated as external, untrusted data**, even when structured-output features are used.

---

## 04 — Document Chunking

Instead of sending the entire document to the model at once, split the text into smaller sections.

```text
PDF
 ↓
Text Extraction
 ↓
Chunks
 ├── Chunk 1
 ├── Chunk 2
 ├── Chunk 3
 └── Chunk N
      ↓
     LLM
      ↓
Candidate Concepts
      ↓
Consolidation
      ↓
Final Flashcards
```

Possible strategies to compare:

* page-based chunking
* fixed-size chunking
* token-based chunking
* semantic chunking

Concepts to explore:

* context windows
* token limits
* parallel LLM calls
* prompt size
* cost
* latency
* deduplication
* result aggregation

---

## 05 — Configurable Generation

Allow users to control the generation process.

Possible settings:

```text
Number of cards
Difficulty
Language
Study focus
Question style
```

For example:

```json
{
  "cardCount": 20,
  "difficulty": "intermediate",
  "focus": "concepts",
  "language": "en"
}
```

This will explore how product-level configuration can be translated into prompts and model parameters.

---

## 06 — Source Grounding

Extend flashcards so that each answer keeps a reference to the original document.

Possible structure:

```json
{
  "front": "What is Apache Kafka?",
  "back": "Apache Kafka is...",
  "source": {
    "page": 14,
    "excerpt": "..."
  }
}
```

The UI could then display:

```text
What is consumer lag?

Consumer lag represents...

Source: page 17
```

This experiment will explore:

* grounding
* citations
* traceability
* reducing hallucinations
* connecting generated content to source documents

---

## 07 — Multiple AI Providers

Introduce an abstraction layer between the application and the AI provider.

For example:

```ts
interface AIProvider {
  generateFlashcards(
    input: FlashcardGenerationInput
  ): Promise<Flashcard[]>;
}
```

Possible implementations:

```text
AIProvider
   │
   ├── GeminiProvider
   ├── OpenAIProvider
   └── OtherProvider
```

This will make it possible to compare models using the same documents and prompts.

Potential metrics:

```text
Model       Latency       Output Quality
Gemini      ...
OpenAI      ...
Other       ...
```

---

## 08 — Study Mode

Evolve the frontend from a card gallery into a simple study experience.

Example:

```text
Card 3 of 10

┌────────────────────────────┐
│                            │
│   What is a Kafka broker?  │
│                            │
│      Click to reveal       │
└────────────────────────────┘

      Previous     Next
```

After revealing the answer:

```text
Did you know this?

Again     Hard     Easy
```

Possible future experiments:

* progress tracking
* review history
* spaced repetition
* difficulty-based scheduling

---

## 09 — Embeddings

Experiment with converting document chunks into embeddings.

```text
Document
   ↓
Chunks
   ↓
Embeddings
   ↓
Vector Representation
```

This will introduce concepts such as:

* vector embeddings
* similarity
* semantic search
* vector databases

---

## 10 — Retrieval-Augmented Generation (RAG)

Instead of sending the entire document to the model, retrieve only the most relevant pieces of context.

```text
PDF
 ↓
Chunks
 ↓
Embeddings
 ↓
Vector Store

User Task / Concept
        ↓
Semantic Retrieval
        ↓
Relevant Chunks
        ↓
LLM
        ↓
Flashcard
```

This will be used to explore one of the most common architectures for applications built on top of LLMs:

**Retrieval-Augmented Generation.**

---

## 🔐 Privacy and Data Handling

The application is designed primarily for local development and experimentation.

Uploaded PDFs are processed by the local backend using in-memory file handling.

However, the extracted document text used to generate flashcards is sent to the configured AI provider.

For this reason, users should avoid uploading sensitive or confidential documents unless they understand the data handling policies of the selected provider.

---

## 📚 What This Project Is About

This project is not intended to be a production-ready replacement for NotebookLM.

NotebookLM's flashcard experience is used as inspiration for a smaller, hands-on implementation that makes it possible to explore how AI-powered document features work underneath.

The project is intentionally evolving in small steps:

```text
LLM API Integration
        ↓
Structured Output
        ↓
Prompt Design
        ↓
Context Management
        ↓
Chunking
        ↓
Grounding
        ↓
Embeddings
        ↓
Retrieval
        ↓
RAG
```

The main goal is not simply to generate flashcards.

It is to use a concrete study feature as a way to understand the building blocks behind modern LLM-powered applications.

---

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).
