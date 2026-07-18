# Workspace Guidelines & Rules

Please adhere to the following rules when modifying this workspace:

## 1. Page Rules (`page.tsx`)
- **No Client Logic**: Never use the `'use client';` directive directly in `page.tsx` files. If you need client interactivity (state, events, hooks), extract it into separate client components inside `src/components/` and import them into `page.tsx`.
- **Page Metadata**: Always export the `Metadata` object directly from each page. Keep the metadata complete and relevant.

## 2. Component & Styling Rules
- **Pure Shadcn**: Always use shadcn components and tokens. Do not write custom CSS in `globals.css` or ad-hoc custom style classes (like `glass-card` or custom scrollbars).
- **Link Styling**: For standard anchor links (`<a>`), style them using `buttonVariants` from `@/components/ui/button` rather than using `<Button asChild>` to avoid build-time React Slot type mismatches.
  ```tsx
  import { buttonVariants } from "@/components/ui/button";

  <a href="..." className={buttonVariants({ variant: "default" })}>
    Link Text
  </a>
  ```

## 3. Code Cleanliness
- **Blank Space Rule**: Don't keep useless comments, template references, or placeholder files. If there is no content for a section, keep the spacing intentionally blank or clean. Keep the layout compact and professional.
