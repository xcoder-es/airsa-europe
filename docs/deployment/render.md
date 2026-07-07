# AIRSA Europe — Render Deployment

## Prerequisites

- GitHub repository connected to Render
- Node.js 20+

## Deployment Steps

1. Push code to GitHub `main` branch
2. In Render Dashboard, create a new **Web Service**
3. Connect your GitHub repository
4. Render will detect `render.yaml` automatically
5. Deploy

## Configuration

The `render.yaml` at repo root defines:

- **Runtime**: Node.js
- **Plan**: Free tier
- **Region**: Frankfurt (EU)
- **Build**: `npm ci && npm run build`
- **Start**: `npm start`
- **Health check**: `/api/health`

## Environment Variables

| Variable       | Value        | Required |
| -------------- | ------------ | -------- |
| `NODE_ENV`     | `production` | Yes      |
| `NODE_VERSION` | `20`         | Yes      |

## Caching

- Static assets cached via Next.js build output
- Health endpoint: `Cache-Control: no-store`
- Security headers configured in `next.config.ts`

## Manual Deploy

```bash
npm ci
npm run build
npm start
```

Verify health: `curl https://your-app.onrender.com/api/health`

## Troubleshooting

- **Build fails**: Check `npm run typecheck` and `npm run lint` locally
- **3D not rendering**: Ensure client-side hydration; check browser WebGL support
- **Slow cold starts**: Free tier spins down after inactivity; first request may take 30s
