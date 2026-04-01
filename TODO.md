# TODO: Fix Navbar Logo Error

## Plan Steps:
- [x] Step 1: Create standalone `components/layout/Logo.tsx` component (extract from Navbar.tsx)
- [x] Step 2: Update `components/layout/Navbar.tsx` - remove local Logo definition, add import, simplify hydration logic
- [x] Step 3: Test by running `npm run dev` and checking Navbar renders without error (app starts successfully on port 3004, no Logo error in logs)
- [ ] Step 4: Update Next.js version if warnings persist (`npx next@latest`)
- [ ] Step 5: Verify other sidebar files if needed and complete task

