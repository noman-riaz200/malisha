# Fix Next.js Hydration Error - TODO

## Steps:
- [x] 1. Edit app/layout.tsx: Wrap <Navbar /> in ClientOnly fallback={null}
- [x] 2. Edit components/layout/Navbar.tsx: Remove all suppressHydrationWarning props
- [x] 3. Edit components/layout/Logo.tsx: Remove all suppressHydrationWarning props
- [ ] 4. Test: Run `npm run dev`, check /login page console for errors
- [ ] 5. Complete task

**Status: Edits complete. Ready for testing.**
