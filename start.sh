function stop_processes {
    echo "Stopping processes..."
    pkill -P $$ 
}

trap stop_processes SIGINT

echo "Starting backend server..."
uvicorn main:app --host 0.0.0.0 --port 3000 &

sleep 3 

echo "Building frontend..."
cd frontend
npm run build

echo "Starting frontend server..."
npm start -- --port 3001
