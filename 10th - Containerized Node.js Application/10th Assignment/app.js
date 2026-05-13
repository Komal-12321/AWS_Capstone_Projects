const http = require("http");

const PORT = 3000;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const uptime = Math.floor((Date.now() - startTime) / 1000);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Node.js ECS App</title>
        <style>
          body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-align: center;
          }

          .container {
            margin-top: 100px;
          }

          h1 {
            font-size: 40px;
            margin-bottom: 10px;
          }

          .card {
            background: white;
            color: #333;
            width: 350px;
            margin: 30px auto;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
          }

          p {
            font-size: 16px;
            margin: 8px 0;
          }

          footer {
            margin-top: 40px;
            font-size: 14px;
            opacity: 0.8;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>Node.js App on AWS ECS</h1>

          <div class="card">
            <p><b>Status:</b> Running </p>
            <p><b>Current Time:</b> ${new Date().toLocaleString()}</p>
            <p><b>Uptime:</b> ${uptime} seconds</p>
          </div>

          <footer>
            Deployed using Docker + ECR + ECS
          </footer>
        </div>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});