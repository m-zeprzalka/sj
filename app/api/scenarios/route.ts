import { NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { z } from "zod"

// Zod schema dla structured output
const ScenarioSchema = z.object({
  scenarios: z
    .array(
      z.object({
        type: z.enum(["positive", "neutral", "negative"]),
        title: z
          .string()
          .describe("Krótki, chwytliwy tytuł scenariusza (max 80 znaków)"),
        description: z
          .string()
          .describe("Szczegółowy opis scenariusza (2-3 zdania)"),
        probability: z
          .string()
          .describe("Prawdopodobieństwo wystąpienia (np. '45%', 'Średnie')"),
        timeframe: z
          .string()
          .describe("Perspektywa czasowa (np. '6-12 miesięcy', '2025-2026')"),
        keyFactors: z
          .array(z.string())
          .length(3)
          .describe("3 kluczowe czynniki wpływające na ten scenariusz"),
      })
    )
    .length(3),
  context: z.object({
    currentSituation: z
      .string()
      .describe("Opis obecnej sytuacji w kraju (3-4 zdania)"),
    geopoliticalFactors: z
      .array(z.string())
      .min(3)
      .max(5)
      .describe("Lista głównych czynników geopolitycznych"),
    recentNews: z
      .array(z.string())
      .min(3)
      .max(5)
      .describe("Lista najważniejszych wydarzeń z ostatnich tygodni"),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const { country } = await req.json()

    if (!country) {
      return NextResponse.json(
        { error: "Country name is required" },
        { status: 400 }
      )
    }

    // Sprawdź API key
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      )
    }

    // Generuj scenariusze przez Vercel AI SDK z Llama 3.3 70B (JSON mode)
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content: `Jesteś ekspertem ds. geopolityki i analiz strategicznych dla Ministerstwa Spraw Zagranicznych.
Zawsze odpowiadasz TYLKO czystym JSON, bez żadnego dodatkowego tekstu, markdown ani komentarzy.`,
        },
        {
          role: "user",
          content: `Przeanalizuj sytuację w kraju: ${country}

Twoim zadaniem jest:
1. Przeanalizować aktualną sytuację geopolityczną tego kraju
2. Wygenerować 3 scenariusze przyszłości (pozytywny, neutralny, negatywny) na okres 6-12 miesięcy
3. Wskazać kluczowe czynniki wpływające na każdy scenariusz
4. Dostarczyć kontekst: obecna sytuacja, czynniki geopolityczne, najważniejsze wydarzenia

WYMAGANIA:
- Scenariusze powinny być realistyczne i oparte na faktach
- Każdy scenariusz musi mieć różne prawdopodobieństwo (np. 30%, 45%, 25%)
- Kluczowe czynniki powinny być konkretne i mierzalne
- Kontekst powinien zawierać aktualne informacje (grudzień 2025)

Zwróć TYLKO czysty JSON zgodny z tym schematem:
{
  "scenarios": [
    {
      "type": "positive" | "neutral" | "negative",
      "title": "Krótki tytuł (max 80 znaków)",
      "description": "Szczegółowy opis (2-3 zdania)",
      "probability": "np. 45%",
      "timeframe": "np. 6-12 miesięcy",
      "keyFactors": ["czynnik 1", "czynnik 2", "czynnik 3"]
    }
  ],
  "context": {
    "currentSituation": "Opis obecnej sytuacji (3-4 zdania)",
    "geopoliticalFactors": ["czynnik 1", "czynnik 2", "czynnik 3"],
    "recentNews": ["wydarzenie 1", "wydarzenie 2", "wydarzenie 3"]
  }
}

WAŻNE: Odpowiedz TYLKO czystym JSON, bez \`\`\`json ani innych formatowań!`,
        },
      ],
      temperature: 0.7,
    })

    // Parse JSON response
    const parsedResponse = JSON.parse(text)

    // Walidacja Zod
    const validatedData = ScenarioSchema.parse(parsedResponse)

    return NextResponse.json(validatedData)
  } catch (error: any) {
    console.error("Error generating scenarios:", error)

    // Lepszy error handling
    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid Groq API key configuration" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: "Failed to generate scenarios",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}
