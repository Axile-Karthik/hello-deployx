# hello-deployx

A minimal React app used to test and validate the **DeployX** self-hosted CI/CD pipeline.

## What it does

- Shows build metadata (git SHA, branch, version) at runtime via Vite env vars
- Live uptime counter (proves the container is alive)
- Visualizes the DeployX deployment pipeline steps

## DeployX detects this as

`NODEJS_REACT` — because `package.json` has `react` and `react-dom` in `dependencies`.

The generated Dockerfile (by DeployX) will be:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # outputs to dist/
```
testing deploy X 3
## Environment variables (optional)

Set these in GitHub Actions or your CI to show real build info:

| Variable | Description |
|---|---|
| `VITE_GIT_SHA` | Full commit SHA (`${{ github.sha }}`) |
| `VITE_GIT_BRANCH` | Branch name (`${{ github.ref_name }}`) |
| `VITE_APP_VERSION` | Version string |
