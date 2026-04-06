# Fix Next.js webpack SSR Error: "Cannot read properties of undefined (reading 'call')"

## Plan Overview
Fix SSR bundle corruption from conditional webpack config, Tailwind paths, metadata order. Clear cache. No code removal.

## Steps (5/9 completed)

### 1. [ ] Update next.config.js
- Wrap webpack changes properly for SSR.
- Remove dev-only ignoreWarnings.

### 2. [ ] Update tailwind.config.js  
- Remove unused './pages/**/*' from content.

### 3. [ ] Fix metadata/dynamic order in app/admin/**/page.tsx (5 files)
- Move `metadata` export before `dynamic`.

### 4. [ ] Fix remaining pages with metadata/dynamic issues.

### 5. [ ] Remove typescript ignoreBuildErrors from next.config.js.

### 6. [ ] Clear .next cache: `rm -rf .next`

### 7. [ ] Run type-check: `npm run type-check`

### 8. [ ] Test dev server: `npm run dev`

### 9. [ ] Verify error fixed; attempt_completion.

**Notes:** Minimal changes only. Test after each major step.
