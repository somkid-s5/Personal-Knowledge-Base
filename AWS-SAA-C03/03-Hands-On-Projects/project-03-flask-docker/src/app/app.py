import os
import time
from flask import Flask, request, jsonify
import psycopg2
import redis
import configparser

app = Flask(__name__)

# IMPROVED: Use Environment Variables with Fallbacks
DB_URL = os.environ.get("DATABASE_URL", "postgresql://admin:supersecretpassword123@localhost:5432/rewards_db")
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

def get_db_connection():
    # Simple retry logic for container startup
    retries = 5
    while retries > 0:
        try:
            conn = psycopg2.connect(DB_URL)
            return conn
        except Exception as e:
            print(f"Waiting for database... {e}")
            retries -= 1
            time.sleep(2)
    raise Exception("Could not connect to database")

@app.route('/')
def index():
    return "<h1>Reward Portal v2.0 (Containerized)</h1><p>Running as non-root user.</p>"

@app.route('/health')
def health():
    # Check DB
    try:
        conn = get_db_connection()
        conn.close()
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": f"DB: {str(e)}"}), 500
    
    # Check Redis
    try:
        r = redis.from_url(REDIS_URL)
        r.ping()
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": f"Redis: {str(e)}"}), 500
        
    return jsonify({"status": "healthy"}), 200

@app.route('/reward', methods=['POST'])
def add_reward():
    if 'image' in request.files:
        file = request.files['image']
        # In IRL, we'd use S3, but for this lab we ensure 'uploads' dir exists
        os.makedirs('uploads', exist_ok=True)
        file.save(os.path.join('uploads', file.filename))
        return jsonify({"status": "Reward saved with image!"}), 201
    return jsonify({"status": "Reward saved!"}), 201

if __name__ == '__main__':
    # Production should use Gunicorn, but for this lab we bind correctly
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
