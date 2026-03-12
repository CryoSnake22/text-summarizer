# Claude Rules

Package Manager: pnpm (preferred)

## shadcn/ui

Before building or modifying any UI component:

1. **Check the registry** — call `get_project_registries` to confirm available registries.
2. **Search first** — use `search_items_in_registries` to find the right component before assuming it exists.
3. **Fetch the demo** — always call `get_item_examples_from_registries` to get real usage examples before writing any component code. Do not rely solely on training knowledge for component structure or props.
4. **View source if needed** — use `view_items_in_registries` to inspect actual file contents when the demo isn't enough.
5. **Use the CLI command** — get the install command via `get_add_command_for_items` rather than manually copying files.
6. **Audit after creation** — run `get_audit_checklist` after generating new components to verify correct setup.

## Next.js Dev Tools

2. **Discover before changing** — call `nextjs_index` before implementing any change to the running app. Use it to inspect routes, errors, and build state first.
3. **Diagnose via runtime** — use `nextjs_call` (not grep or file reads) as the first tool for investigating errors, checking routes, or querying build status.
4. **Docs over training knowledge** — for any Next.js API question, use `nextjs_docs`. First read the `nextjs-docs://llms-index` resource to find the correct path, then fetch it. Never rely on training data for Next.js APIs.
5. **Browser testing** — do NOT use `browser_eval` or take screenshots to verify UI. Ask the user to check and report back instead.

## Dev Commands

- Dev server: `pnpm dev` — **do not run this yourself, the user manages the dev server**
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Test: `pnpm test`

## Component Guidelines

- Use shadcn/ui components by default for form elements, cards, dialogs, etc.
- Style components with Tailwind utility classes
