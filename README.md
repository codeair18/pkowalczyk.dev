# Strona pkowalczyk.dev

Nowoczesna strona portfolio i CV zbudowana w Nuxt 3, prezentująca doświadczenie zawodowe, umiejętności i projekty z obsługą wielu języków i responsywnym designem.

## Funkcje

- **Wsparcie wielu języków** - Lokalizacja polska i angielska
- **Tryb ciemny/jasny** - Przełącznik motywu z niestandardowymi zmiennymi CSS
- **Responsywny design** - Podejście mobile-first z interaktywnymi elementami
- **Strony Portfolio i CV** - Dedykowane layouty dla różnych typów treści
- **Rozwój z HTTPS** - Bezpieczne środowisko deweloperskie

## Stack technologiczny

- **Nuxt 3** - Framework Vue.js z obsługą SSR/SSG
- **Vue 3** - Framework frontend z Composition API
- **TypeScript** - Typowany JavaScript
- **Nuxt UI** - Biblioteka komponentów z Tailwind CSS
- **Sass** - Preprocesor CSS
- **VueUse** - Narzędzia Composition API

## Rozpoczęcie pracy

### Wymagania

- Node.js (zalecana najnowsza wersja LTS)
- npm

### Instalacja

```bash
npm install
```

### Serwer deweloperski

Uruchom serwer deweloperski z HTTPS na porcie 3001:

```bash
npm run dev
```

Strona będzie dostępna pod adresem `https://localhost:3001`

### Komendy budowania

```bash
npm run build      # Zbuduj dla produkcji
npm run generate   # Wygeneruj statyczną stronę
npm run preview    # Podgląd wersji produkcyjnej
```

## Struktura projektu

```
├── components/
│   └── switcher/           # Komponenty przełącznika motywu
├── pages/
│   ├── index.vue          # Główna strona portfolio
│   └── cv.vue             # Strona CV/resume
├── public/
│   └── static/            # Zasoby statyczne
├── server/                # Kod serwerowy
├── app.vue               # Główny komponent
├── nuxt.config.ts        # Konfiguracja Nuxt
├── app.config.ts         # Konfiguracja aplikacji
├── i18n.config.ts        # Konfiguracja internacjonalizacji
└── CLAUDE.md             # Wytyczne deweloperskie
```

## Rozwój

Projekt wykorzystuje:
- Certyfikaty SSL z podpisem własnym dla rozwoju HTTPS
- Niestandardowe zmienne CSS dla motywów
- Reaktywne struktury danych dla doświadczenia i umiejętności
- Automatycznie importowane komponenty

Szczegółowe wytyczne deweloperskie znajdziesz w [CLAUDE.md](./CLAUDE.md).
