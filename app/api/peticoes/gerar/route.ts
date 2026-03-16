import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Você é um advogado brasileiro altamente experiente, atuando como um operador de direito especialista em redação de petições jurídicas. 

Suas petições devem:
1. Seguir rigorosamente as normas processuais brasileiras (CPC, CLT, CPP, conforme aplicável)
2. Utilizar linguagem jurídica formal e técnica adequada
3. Incluir fundamentação legal completa com citação de artigos de lei e jurisprudência quando pertinente
4. Seguir a estrutura correta para o tipo de peça solicitada
5. Incluir todos os elementos obrigatórios (endereçamento, qualificação das partes, fatos, direito, pedidos, valor da causa quando aplicável)

FORMATO DE SAÍDA: Retorne a petição em HTML válido usando as seguintes tags:
- <h1> para o endereçamento ao juízo
- <h2> para os títulos das seções (DOS FATOS, DO DIREITO, DOS PEDIDOS, etc.)
- <p> para parágrafos
- <strong> para destaques e nomes das partes
- <ol> e <li> para listas numeradas (pedidos)
- <ul> e <li> para listas não numeradas

NÃO inclua tags <html>, <head>, <body> ou qualquer wrapper. Retorne APENAS o conteúdo HTML da petição.
NÃO inclua blocos de código markdown. Retorne HTML puro diretamente.`;

interface GeradorRequest {
  areaDireito: string;
  tipoPeca: string;
  dadosAutor: string;
  dadosReu: string;
  fatos: string;
  pedidos: string;
  observacoes?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key do Gemini não configurada" },
        { status: 500 }
      );
    }

    const body: GeradorRequest = await request.json();

    const { areaDireito, tipoPeca, dadosAutor, dadosReu, fatos, pedidos, observacoes } = body;

    if (!areaDireito || !tipoPeca || !fatos || !pedidos) {
      return NextResponse.json(
        { error: "Campos obrigatórios: área do direito, tipo da peça, fatos e pedidos" },
        { status: 400 }
      );
    }

    const userPrompt = `Gere uma petição jurídica completa com as seguintes informações:

ÁREA DO DIREITO: ${areaDireito}
TIPO DE PEÇA: ${tipoPeca}

DADOS DO AUTOR/REQUERENTE:
${dadosAutor || "A ser preenchido pelo advogado"}

DADOS DO RÉU/REQUERIDO:
${dadosReu || "A ser preenchido pelo advogado"}

FATOS:
${fatos}

PEDIDOS:
${pedidos}

${observacoes ? `OBSERVAÇÕES ADICIONAIS:\n${observacoes}` : ""}

Gere a petição completa, profissional e pronta para uso, seguindo todas as formalidades processuais da área de ${areaDireito}.`;

    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Erro ao comunicar com a API do Gemini" },
        { status: 502 }
      );
    }

    const data = await geminiResponse.json();

    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!generatedText) {
      return NextResponse.json(
        { error: "A IA não gerou conteúdo. Tente novamente." },
        { status: 500 }
      );
    }

    // Clean up any markdown code fences the model might include
    let html = generatedText.trim();
    if (html.startsWith("```html")) {
      html = html.slice(7);
    } else if (html.startsWith("```")) {
      html = html.slice(3);
    }
    if (html.endsWith("```")) {
      html = html.slice(0, -3);
    }
    html = html.trim();

    return NextResponse.json({ conteudo: html });
  } catch (error) {
    console.error("Erro ao gerar petição:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a solicitação" },
      { status: 500 }
    );
  }
}
