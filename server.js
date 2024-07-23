const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
// Enable CORS for all origins
app.use(cors());

// Replace 'http://your-production-server.com' with your actual production server URL
const targetUrl = 'https://sandbox.tiberbu.health';

// Configure proxy middleware for production API endpoints
const apiProxy = createProxyMiddleware({ target: targetUrl, changeOrigin: true });

// Map requests to '/api' to the production server
app.use('/api', apiProxy);

// Serve static files from your React app's build folder (adjust path as needed)
app.use(express.static('build'));

const port = process.env.PORT || 3001; // Set your preferred port

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
