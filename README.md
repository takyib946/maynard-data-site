# MAYNARD DATA — King Flexy backend starter

This folder is intended to be added to the existing `maynard-data-site` GitHub repository.

## Included endpoints

- `GET /api/packages` — reads the supplier package list without exposing the API key.
- `GET /api/status?reference=...` — checks a supplier order reference.
- `POST /api/purchase` — intentionally returns `501` and does not place purchases.

## Network names

The supplier's documented network names are case-sensitive:

- `MTN`
- `Telecel`
- `AT-iShare`
- `AT-BigTime`

## Vercel environment variable

Add `KINGFLEXY_API_KEY` in Vercel → Project Settings → Environment Variables.
Paste the key directly into Vercel's secure value field. Never put it in HTML,
JavaScript delivered to browsers, GitHub, screenshots, or chat.

Do not add or enable automatic purchases yet. A customer-entered MoMo
transaction reference is not proof of payment. A trusted server-side payment
verification process and adult administrator review are required before
any supplier purchase flow can be implemented.

## Deploy

Commit these files to the root of the existing GitHub repository. Vercel
will redeploy from the connected `main` branch.
