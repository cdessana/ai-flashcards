# 🧠 AI Flashcard Generator

A full-stack study project that turns PDF documents into flashcards using generative AI.

Inspired by the **flashcard experience from NotebookLM**, this project was created as a hands-on way to explore how web applications can integrate with large language models.

The goal is not to reproduce NotebookLM, but to use a simple study workflow to learn about **LLM integration, structured outputs, document processing, chunking, grounding, embeddings, and RAG**.

---

## ✨ Features

* 📄 Extracts text from multi-page PDFs
* 🤖 Generates study flashcards using Google Gemini
* 🧩 Uses structured JSON output
* 🃏 Displays interactive flip cards
* 💻 Runs locally with your own Gemini API key

The current flashcard format is:

```json
[
  {
    "front": "Question",
    "back": "Answer"
  }
]
```

---

## 🏗️ How It Works

```text
PDF Upload
    ↓
React Frontend
    ↓
Express Backend
    ↓
PDF Text Extraction
    ↓
Gemini API
    ↓
Structured Flashcard JSON
    ↓
Interactive Flashcards
```

At the current stage, the extracted document text is sent to the model in a single request.

This provides a simple baseline before experimenting with more advanced context-management techniques.

---

## 🛠️ Tech Stack

| Area           | Technologies                 |
| -------------- | ---------------------------- |
| Frontend       | React, TypeScript, Vite      |
| Backend        | Node.js, Express, TypeScript |
| PDF Processing | Multer, `pdfjs-dist`         |
| AI             | Google Gemini API            |

---

## 🎯 Learning Goals

This project is primarily a playground for learning how AI-powered features are built.

Topics explored or planned include:

* LLM API integration
* Prompt design
* Structured model outputs
* Runtime validation of AI responses
* Context windows and token limits
* Document chunking
* Source grounding
* Multiple AI providers
* Embeddings and semantic search
* Retrieval-Augmented Generation (RAG)

---

## 🚀 Getting Started

### Prerequisites

* Node.js v24+
* A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Clone the repository

```bash
git clone https://github.com/cdessana/ai-flashcards.git
cd ai-flashcards
```

### Backend

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8080
GEMINI_API_KEY=your_google_ai_key_here
```

You can use `.env.example` as a reference.

Run the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

## ⚠️ Current Limitations

* Works best with text-based PDFs
* Scanned PDFs are not supported yet
* Large documents are not chunked yet
* The number of flashcards is currently fixed
* Flashcards do not yet include source references
* Only Gemini is currently supported
* There is no persistent storage

These limitations are also useful starting points for future experiments.

---

## 🧪 Learning Roadmap

| Stage | Topic                              | Status     |
| ----- | ---------------------------------- | ---------- |
| 01    | Basic LLM integration              | ✅ Done     |
| 02    | Runtime validation of AI responses | 🔜 Next    |
| 03    | Document chunking                  | 📋 Planned |
| 04    | Configurable flashcard generation  | 📋 Planned |
| 05    | Source grounding                   | 📋 Planned |
| 06    | Multiple AI providers              | 📋 Planned |
| 07    | Study mode                         | 📋 Planned |
| 08    | Embeddings and semantic search     | 📋 Planned |
| 09    | Retrieval-Augmented Generation     | 📋 Planned |

Detailed implementation tasks are tracked in the project's [GitHub Issues](https://github.com/cdessana/ai-flashcards/issues).

The learning path is roughly:

```text
LLM Integration
      ↓
Structured Output
      ↓
Chunking
      ↓
Grounding
      ↓
Embeddings
      ↓
Semantic Retrieval
      ↓
RAG
```

---

## 🔐 Privacy

PDF parsing happens locally in the backend.

However, the extracted text used to generate flashcards is sent to the configured AI provider.

Avoid uploading sensitive or confidential documents unless you understand the provider's data-handling policies.

---

## 📚 Why This Project?

The main goal is not simply to generate flashcards.

The project uses a concrete study feature as a way to understand the building blocks behind modern LLM-powered applications, starting with a simple flow:

```text
Document → LLM → Flashcards
```

and gradually evolving toward:

```text
Document
   ↓
Chunks
   ↓
Embeddings
   ↓
Retrieval
   ↓
Relevant Context
   ↓
LLM
   ↓
Grounded Output
```

---

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).
