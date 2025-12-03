# 🚀 Hackathon Starter Kit - Basic Boilerplate

Minimalistyczny boilerplate do szybkiego startu w hackathonach. Landing Page jako prezentacja + Mock Dashboard.

## 🎯 Co jest w środku?

### 📦 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Shadcn/UI** (10 komponentów)
- **Framer Motion** (animacje)
- **Lucide React** (ikony)

### 🏗️ Struktura

```
app/
├── (marketing)/          # Landing Page - Prezentacja
│   ├── layout.tsx       # Navbar + Footer
│   └── page.tsx         # 5 sekcji: Hero, Problems, Solutions, Metrics, Tech
├── (app)/               # Aplikacja
│   ├── layout.tsx       # Sidebar + Header
│   └── dashboard/       # Mock dashboard
components/
├── marketing/           # Hero, ProblemCards, SolutionBento, etc.
├── dashboard/           # StatCard, EmptyState
└── layout/              # Navbars, Sidebar, Footer
lib/
├── content.ts           # ⭐ PLACEHOLDERY - EDYTUJ TO!
├── animations.ts        # Framer Motion presets
└── utils.ts             # cn() helper
```

## 🚀 Quick Start (3 kroki)

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom dev server
npm run dev

# 3. Otwórz http://localhost:3000
```

## ✏️ Jak dostosować do swojego projektu?

### Krok 1: Edytuj `lib/content.ts`

To jest **JEDYNY PLIK**, który musisz edytować na starcie. Wszystkie teksty, liczby i placeholdery są tam.

```typescript
export const CONTENT = {
  project: {
    name: "[NAZWA PROJEKTU]", // ← Zmień to
    tagline: "[KRÓTKI OPIS]", // ← I to
    // ...
  },
  // ...
}
```

**Tip:** Użyj `Ctrl+F` i szukaj `[` aby znaleźć wszystkie placeholdery.

### Krok 2: Dodaj swoją logikę do Dashboard

Idź do `app/(app)/dashboard/page.tsx` i zamień `EmptyState` na swoje komponenty (wykresy, mapy, tabele).

## 🎨 Gotowe komponenty

### Marketing (Landing Page)

- `<Hero />` - Główna sekcja z CTA
- `<ProblemCards />` - 3 karty z problemami
- `<SolutionBento />` - Bento grid z funkcjami (4 kafelki)
- `<ImpactMetrics />` - Liczby pokazujące wartość
- `<TechStackBadges />` - Badge'e z technologiami

### Dashboard

- `<StatCard />` - KPI card z trendem
- `<EmptyState />` - Placeholder na wykresy/mapy

### Layout

- `<MarketingNav />` - Navbar z glassmorphism
- `<MarketingFooter />` - Footer z separatorem
- `<AppSidebar />` - Sidebar aplikacji
- `<AppHeader />` - Header z breadcrumb

## 🎭 Animacje (Framer Motion)

Wszystkie predefiniowane animacje są w `lib/animations.ts`:

```typescript
import { fadeInUp, staggerContainer } from "@/lib/animations"

;<motion.div variants={fadeInUp} initial="initial" whileInView="animate">
  Content
</motion.div>
```

Dostępne: `fadeIn`, `fadeInUp`, `slideInLeft`, `scaleIn`, `staggerContainer`, `pulse`, `glow`, etc.

## 🎨 Design System

### Kolory

- Tryb ciemny (dark mode) domyślnie włączony
- Paleta: Primary (niebieski), Secondary (szary), Destructive (czerwony)
- Gradient text: `className="gradient-text"`
- Glass effect: `className="glass"`

### Spacing

- Sekcje: `py-24` (desktop), `py-16` (mobile)
- Containers: `max-w-7xl mx-auto px-4`

## 📂 Routing

- `/` → Landing Page (Marketing)
- `/dashboard` → Dashboard (App)
- `/dashboard/analytics` → Placeholder (do zrobienia)
- `/dashboard/reports` → Placeholder (do zrobienia)
- `/dashboard/settings` → Placeholder (do zrobienia)

## 🔧 Konfiguracja

### Zmiana kolorów

Edytuj `app/globals.css` w sekcji `:root` i `.dark`:

```css
:root {
  --primary: oklch(0.205 0 0); /* Twój kolor */
}
```

### Dodawanie nowych komponentów Shadcn

```bash
npx shadcn@latest add [component-name]
```

## 📦 Gotowe do duplikacji

Ten folder jest szablonem. Aby stworzyć nowy projekt:

```bash
# Z poziomu C:\app\BOILERPLATES
cp -r basic moj-projekt
cd moj-projekt
npm install
# Edytuj lib/content.ts
npm run dev
```

## 🎯 Na co zwrócić uwagę w dniu hackathonu

1. **Edytuj `lib/content.ts` jako pierwsze** (10 min)
2. Sprawdź czy wszystko działa: `npm run dev` (2 min)
3. Dodaj swoją logikę do `app/(app)/dashboard/page.tsx` (reszta czasu)
4. Landing Page jest gotowy do prezentacji!

## 📝 Notatki

- Route Groups `(marketing)` i `(app)` pozwalają na różne layouty
- Marketing ma transparent navbar, App ma sidebar
- Wszystkie animacje są "scroll-triggered" (włączają się przy scrollowaniu)
- Dark mode jest domyślny, light mode działa automatycznie

---

**Powodzenia na hackathonie! 🚀**
