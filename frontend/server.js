import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.API_URL || 'http://localhost:5001';

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// API proxy - forward API requests to backend
app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // Keep /api prefix
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: { message: 'Backend connection failed' } });
  },
}));

// Handle React Router - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'dist', 'index.html');
  const html = readFileSync(indexPath, 'utf-8');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Production server running on http://localhost:${PORT}`);
  console.log(`📦 Serving files from: ${join(__dirname, 'dist')}`);
  console.log(`🔗 Backend API: ${BACKEND_URL}`);
});

