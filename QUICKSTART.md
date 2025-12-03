# 🚀 QUICK START GUIDE - Scenariusze Jutra

## Aplikacja do przewidywania scenariuszy geopolitycznych

### 1️⃣ Zainstaluj dependencies (2 minuty)

```bash
npm install --legacy-peer-deps
```

**Uwaga**: Flaga `--legacy-peer-deps` jest wymagana dla `react-simple-maps` z React 19.

### 2️⃣ Skonfiguruj API Key (1 minuta)

Otwórz plik `.env.local` i **upewnij się że klucz Groq jest wypełniony**:

```bash
GROQ_API_KEY=gsk_twoj_klucz_tutaj
```

🆓 **Darmowy klucz Groq**: https://console.groq.com/keys

### 3️⃣ Jak działa aplikacja? (WAŻNE - przeczytaj!)

**Prosty przepływ:**

1. **Użytkownik klika kraj** → Dashboard wysyła nazwę kraju do API
2. **API łączy się z Groq** → Używa modelu Llama 3.3 70B (darmowy!)
3. **AI analizuje sytuację** → Model ma wiedzę o świecie do 2024 roku
4. **Generuje 3 scenariusze:**
   - 🟢 **Pozytywny** - optymistyczna przyszłość (np. stabilizacja, rozwój)
   - 🟡 **Neutralny** - status quo z niewielkimi zmianami
   - 🔴 **Negatywny** - pesymistyczna przyszłość (np. konflikty, kryzys)
5. **Zwraca JSON** → Strukturowane dane (tytuły, opisy, prawdopodobieństwa)
6. **Walidacja Zod** → Sprawdzenie czy dane są poprawne
7. **Wyświetlenie** → Panel pokazuje scenariusze + kontekst geopolityczny

**Co bierze pod uwagę AI:**

- Historia konfliktów i współpracy międzynarodowej
- Obecna sytuacja polityczna i gospodarcza
- Relacje z krajami sąsiadującymi
- Czynniki demograficzne, ekonomiczne, społeczne
- Wzorce historyczne z podobnych krajów

**Ograniczenia:**

- ❌ AI nie ma dostępu do internetu - bazuje na wiedzy z treningu (~2024)
- ❌ Scenariusze to "edukowane zgadywanie", nie przepowiednia
- ✅ Idealne do dema/prototypu na hackathon

### 4️⃣ Uruchom aplikację (1 minuta)

```bash
npm run dev
```

Otwórz: http://localhost:3000

### 5️⃣ Sprawdź Landing Page

Powinieneś zobaczyć:

- ✅ Hero "Scenariusze Jutra" z gradientem
- ✅ 3 problemy (chaos informacyjny, brak przewidywalności, fragmentaryczna wiedza)
- ✅ 4 funkcje w Bento grid (mapa interaktywna, 3 scenariusze AI, analiza newsów, kontekst geopolityczny)
- ✅ 3 metryki (195 krajów, 3 scenariusze, <30s)
- ✅ Tech stack: Next.js 15, Llama 3.3 70B, Groq API

### 6️⃣ Testuj Dashboard

Przejdź do: http://localhost:3000/dashboard

**Co powinieneś zobaczyć:**

1. ✅ Mapa świata z 195 krajami (jasny szary kolor)
2. ✅ Info bar u góry: "Kliknij w dowolny kraj..."
3. ✅ Zoom controls (prawy górny róg) - 3 przyciski

**Kliknij w dowolny kraj:**

1. 🔄 Panel wysuwa się z prawej strony
2. ⏳ Loader + tekst "Analizuję sytuację geopolityczną..."
3. ⏱️ Po ~5-10 sekundach (Groq jest szybki!) zobaczysz:
   - **Tab "Scenariusze"**: 3 kolorowe karty (zielona/żółta/czerwona)
   - **Tab "Kontekst"**: Obecna sytuacja + czynniki geopolityczne + źródła
4. 📜 Panel **przewija się** - możesz scrollować w dół
5. ❌ Przycisk X zamyka panel

**Polskie nazwy krajów:**

- 🇵🇱 Poland → **Polska**
- 🇩🇪 Germany → **Niemcy**
- 🇫🇷 France → **Francja**
- 🇺🇦 Ukraine → **Ukraina**
- 🇷🇺 Russia → **Rosja**
- ...i 190+ innych krajów!

---

## 🎯 Co dalej? (Reszta hackathonu)

### Opcja A: Dodaj prawdziwe dane

1. Stwórz plik JSON w `data/mocks/`
2. Importuj w dashboard: `import data from '@/data/mocks/my-data.json'`
3. Użyj w komponentach

### Opcja B: Dodaj wykres (Recharts)

```bash
npm install recharts
```

```tsx
// W app/(app)/dashboard/page.tsx
import { BarChart, Bar, XAxis, YAxis } from "recharts"
;<BarChart width={600} height={300} data={data}>
  <Bar dataKey="value" fill="#3b82f6" />
  <XAxis dataKey="name" />
  <YAxis />
</BarChart>
```

### Opcja C: Dodaj mapę (React Leaflet)

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

Stwórz komponent w `components/maps/MapView.tsx` (patrz dokumentacja w README.md)

### Opcja D: Dodaj AI endpoint

Stwórz `app/api/chat/route.ts`:

```typescript
import { OpenAI } from "openai"

export async function POST(req: Request) {
  const { message } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  })

  return Response.json({
    reply: response.choices[0].message.content,
  })
}
```

---

## ⏱️ Timeline (Przykładowy)

```
09:00 - Wybór zadania
09:10 - Skopiowanie boilerplate
09:15 - Edycja lib/content.ts
09:30 - Sprawdzenie Landing Page ✅
09:30 - 18:00 - Budowanie logiki w Dashboard
18:00 - 22:00 - Integracja + testy
22:00 - 24:00 - Prezentacja (Landing już gotowy!)
```

---

## 🆘 Troubleshooting

### Build error: "Functions cannot be passed to Client Components"

→ Dodaj `"use client"` na górze pliku

### Framer Motion nie działa

→ Sprawdź czy komponent ma `"use client"`

### Strona nie ładuje się

→ Sprawdź konsolę przeglądarki (F12)
→ Sprawdź terminal (czy są błędy)

### Landing Page jest pusty

→ Sprawdź czy edytowałeś `lib/content.ts`
→ Sprawdź czy nie ma błędów składni w JSON

---

**Powodzenia! 🚀**
