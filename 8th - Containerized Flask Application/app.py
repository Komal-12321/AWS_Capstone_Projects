from flask import Flask
import datetime

app = Flask(__name__)

start_time = datetime.datetime.now()

@app.route('/')
def home():
    uptime = datetime.datetime.now() - start_time
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return f"""
    <html>
    <head>
        <title>Flask ECS App</title>
        <style>
            body {{
                font-family: Arial;
                text-align: center;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                margin-top: 100px;
            }}
            .card {{
                background: white;
                color: #333;
                padding: 20px;
                border-radius: 10px;
                width: 300px;
                margin: auto;
            }}
        </style>
    </head>
    <body>
        <h1>🚀 Flask App on AWS ECS</h1>

        <div class="card">
            <p><b>Status:</b> Running ✅</p>
            <p><b>Current Time:</b> {current_time}</p>
            <p><b>Uptime:</b> {uptime}</p>
        </div>

        <p>Containerized with Docker | Deployed on ECS</p>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)