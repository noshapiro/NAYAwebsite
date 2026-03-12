# Favicon not updating on Vercel?

1. **Clear Vercel build cache:** In Vercel Dashboard → your project → **Settings** → **General** → scroll to **Build Cache** → next deployment, turn **off** "Use existing build cache" (or use **Redeploy** and check "Clear build cache" when redeploying).

2. **Redeploy** the project (Deployments → ... → Redeploy).

3. **Hard refresh** the site (Cmd+Shift+R) or open in an incognito window — browsers cache favicons heavily.

The app uses `src/app/icon.png` and links in layout; `/favicon.ico` is rewritten to the same icon.
