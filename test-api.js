import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Carrega a chave do arquivo .env
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERRO: A chave GEMINI_API_KEY não foi encontrada no arquivo .env");
  process.exit(1);
}

// Inicializa o cliente do Gemini
const genAI = new GoogleGenerativeAI(apiKey);

async function testarConexao() {
  console.log("Conectando ao Gemini...");
  
  try {
    // Seleciona o modelo Flash (mais rápido e barato/gratuito)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Envia uma pergunta simples
    const prompt = "Diga 'Conexão estabelecida com sucesso!' se você estiver me ouvindo.";
    const result = await model.generateContent(prompt);
    
    console.log("\nResposta do Gemini:");
    console.log(result.response.text());
    
  } catch (error) {
    console.error("\nFalha na conexão. Erro:");
    console.error(error.message);
  }
}

testarConexao();
