# Strona pkowalczyk.dev

Nowoczesna strona portfolio i CV zbudowana w Nuxt 3, prezentująca doświadczenie zawodowe, umiejętności i projekty z obsługą wielu języków i responsywnym designem.

## Funkcje

- **Wsparcie wielu języków** - Lokalizacja polska i angielska
- **Tryb ciemny/jasny** - Przełącznik motywu z niestandardowymi zmiennymi CSS
- **Responsywny design** - Podejście mobile-first z interaktywnymi elementami
- **Strony Portfolio, CV, Doświadczenie i Certyfikaty** - Dedykowane layouty dla różnych typów treści
- **Asystent AI zbierający leady** - Strumieniowy czat oparty na OpenRouter, który prowadzi rozmowę o projekcie i przez wywołanie narzędzia (`submit_requirements`) przekazuje zebrane wymagania do kanału powiadomień
- **Rozwój z HTTPS** - Bezpieczne środowisko deweloperskie

## Stack technologiczny

- **Nuxt 4** - Framework Vue.js z obsługą SSR/SSG
- **Vue 3** - Framework frontend z Composition API
- **TypeScript** - Typowany JavaScript
- **Nuxt UI** - Biblioteka komponentów z Tailwind CSS
- **Sass** - Preprocesor CSS
- **VueUse** - Narzędzia Composition API
- **OpenRouter** - Brama do modeli LLM zasilająca asystenta AI

## Rozpoczęcie pracy

### Wymagania

- Node.js (zalecana najnowsza wersja LTS)
- npm

### Instalacja

```bash
npm install
```

### Zmienne środowiskowe

Asystent AI na stronie głównej korzysta z OpenRouter. Skopiuj `.env.example` do `.env` i uzupełnij klucz:

```bash
cp .env.example .env
```

| Zmienna | Wymagana | Opis |
| --- | --- | --- |
| `NUXT_OPENROUTER_API_KEY` | tak | Klucz API z [openrouter.ai/keys](https://openrouter.ai/keys) |
| `NUXT_OPENROUTER_MODEL` | nie | Nadpisanie modelu (domyślnie `anthropic/claude-haiku-4.5`) |

Bez klucza czat wyświetli komunikat o tymczasowej niedostępności asystenta.

Zebrane leady są obecnie wypisywane w konsoli serwera (mock w `server/api/lead.post.ts`). Podmiana na realną integrację (Slack, e-mail, CRM) to zmiana w jednym pliku.

### Serwer deweloperski

Uruchom serwer deweloperski na porcie 3001:

```bash
npm run dev
```

Strona będzie dostępna pod adresem `http://localhost:3001`

### Komendy budowania

```bash
npm run build      # Zbuduj dla produkcji
npm run generate   # Wygeneruj statyczną stronę
npm run preview    # Podgląd wersji produkcyjnej
```

## Struktura projektu

```
├── components/
│   ├── AgentChat.vue       # Widżet czatu asystenta AI
│   └── switcher/           # Komponenty przełącznika motywu
├── pages/
│   ├── index.vue           # Główna strona portfolio
│   ├── experience.vue      # Oś czasu doświadczenia zawodowego
│   ├── certifications.vue  # Certyfikaty
│   ├── cv.vue              # Strona CV/resume
│   ├── contact.vue         # Strona kontaktowa
│   └── tree.vue            # Strona w stylu link-tree
├── server/
│   ├── api/
│   │   ├── chat.post.ts    # Strumieniowy proxy do OpenRouter (NDJSON)
│   │   └── lead.post.ts    # Kanał leadów (mock)
│   └── utils/
│       └── agent.ts        # Prompt systemowy + schemat narzędzia asystenta
├── public/                 # Zasoby statyczne
├── app.vue                 # Główny komponent
├── nuxt.config.ts          # Konfiguracja Nuxt
├── app.config.ts           # Konfiguracja aplikacji
├── i18n.config.ts          # Konfiguracja internacjonalizacji
└── CLAUDE.md               # Wytyczne deweloperskie
```

## Rozwój

Projekt wykorzystuje:
- Certyfikaty SSL z podpisem własnym dla rozwoju HTTPS
- Niestandardowe zmienne CSS dla motywów
- Reaktywne struktury danych dla doświadczenia i umiejętności
- Automatycznie importowane komponenty

Szczegółowe wytyczne deweloperskie znajdziesz w [CLAUDE.md](./CLAUDE.md).
