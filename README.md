# Vue Todo

A minimal, feature-rich todo app built with modern web stack.

🔗 **[Live Demo](https://mustafayevt.github.io/Vue-Todo-shadcn/)**

## Tech Stack

**Core:**
- Vue 3.5 (Composition API with `<script setup>`)
- TypeScript (strict mode)
- Vite 7 (build tool + HMR)

**Styling:**
- Tailwind CSS v4 (utility-first with `@theme` directive)
- shadcn-vue (accessible components built on Radix Vue)
- Lucide (icon library)

**State & Utils:**
- VueUse core (useDark, useToggle, useStorage)
- VueUse integrations (useSortable)
- Sortable.js (drag-and-drop)
- class-variance-authority (component variants)

## Features

**Todo Management:**
- Create, edit, and delete todos
- Rich metadata: title, description, category, tags, due date
- Status tracking (todo → in-progress → done)
- Priority levels (low, medium, high, urgent)
- Overdue indicators for past-due items

**Organization:**
- Drag-and-drop reordering
- Multi-dimensional filtering (status, priority, category)
- Real-time search across all fields
- Auto-categorization and tag suggestions

**UI/UX:**
- Statistics dashboard with completion tracking
- Dark/light mode toggle
- Fully accessible components (keyboard navigation, ARIA)
- Responsive design for all screen sizes

**Persistence:**
- LocalStorage auto-save
- No backend required
- State preserved across sessions

## Project Structure

```
src/
├── components/
│   ├── todo/
│   │   ├── TodoForm.vue      # Add/edit dialog
│   │   ├── TodoItem.vue      # Individual todo card
│   │   ├── TodoList.vue      # Sortable container
│   │   ├── TodoFilters.vue   # Search & filter UI
│   │   └── TodoStats.vue     # Dashboard stats
│   └── ui/                   # shadcn-vue components
├── composables/
│   └── useTodos.ts           # State management
├── types/
│   └── todo.ts               # TypeScript definitions
└── App.vue                   # Root component
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

## License

MIT

**State Management:**  
Uses `useTodos` composable with VueUse's `useStorage` for reactive localStorage persistence. All CRUD operations are centralized here.

**Component System:**  
shadcn-vue components installed via CLI (`npx shadcn-vue@latest add`). Each component is customizable and tree-shakeable.

**Styling Approach:**  
Tailwind v4 uses `@import "tailwindcss"` with inline `@theme` configuration. No separate config file needed. OKLCH color space for better perceptual uniformity.

**Type Safety:**  
Strict TypeScript throughout. Enums for status/priority, interfaces for data shapes. All props and emits are typed.

## Future Ideas

- Backend sync (Supabase/Firebase)
- Recurring tasks
- Subtasks and checklists
- Collaboration features
- Export to JSON/CSV
- Calendar view
- Pomodoro timer integration