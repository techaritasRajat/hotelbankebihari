import { createApp } from './app.js';

const app = createApp();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
  console.log(`Health check  → http://localhost:${PORT}/health`);
  console.log(`Environment   → ${process.env.NODE_ENV || 'development'}`);
});
