const codespaceName = process.env.CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const port = Number(process.env.PORT ?? 8000)