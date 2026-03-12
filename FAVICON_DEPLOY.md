# Favicon not updating on Vercel?

The app uses `public/favicon.png` and wires it in `layout.tsx` (metadata + `<head>` links with `?v=2` cache-buster).

1. **Clear Vercel build cache:** Redeploy with "Clear build cache" enabled.
2. **Hard refresh** (Cmd+Shift+R) or open in incognito — browsers cache favicons heavily.
