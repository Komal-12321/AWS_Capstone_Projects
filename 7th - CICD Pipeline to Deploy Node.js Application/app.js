const http = require("http");

const PORT = 3000;

// Simple router
const server = http.createServer((req, res) => {

  console.log(`Request received: ${req.method} ${req.url}`);

  // Route: Home
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1>🚀 CI/CD Node.js App</h1>
      <p>Deployed automatically using AWS CodePipeline</p>
      <a href="/status">Check Status</a>
    `);
  }

  // Route: Status
  else if (req.url === "/status") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "Running",
      time: new Date(),
      uptime: process.uptime()
    }));
  }

  // Route: Health Check
  else if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  }

  // Route: About
  else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>About Project</h2>
      <p>This app is deployed using CI/CD pipeline with AWS CodePipeline and CodeBuild.</p>
    `);
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
