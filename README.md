# blue-prototypes
BLUE — Bike Leasing Unified Experience. Cart & Checkout redesign prototypes for JobRad.

## Stack
React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui

## Running locally

Open Terminal and run:

```
cd /Users/boris.slogar/Documents/Claude/BLUE/05_prototypes && npm run dev
```

This starts a local dev server. Open your browser and go to `http://localhost:5173` — that's your prototype.

Press `Ctrl + C` in Terminal to stop it.

## Keeping things up to date

Nothing updates automatically. Nothing is urgent. Claude will tell you when something needs updating and give you the exact command.

**Homebrew + gh (once a month or so):**
```
brew update && brew upgrade
```

**Project packages (npm) — only when Claude says to:**
```
cd /Users/boris.slogar/Documents/Claude/BLUE/05_prototypes && npm update
```

## Adding shadcn components

```
cd /Users/boris.slogar/Documents/Claude/BLUE/05_prototypes && npx shadcn@latest add [component-name]
```

Example: `npx shadcn@latest add button card input`
