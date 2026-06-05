#!/bin/bash

# Trap CTRL+C to clean up both processes
trap 'kill $CLIENT_PID $SERVER_PID 2>/dev/null; exit' INT TERM

# Start client in the background
cd client
npm run dev &
CLIENT_PID=$!

# Start server in the background
cd ../server
npm run dev &
SERVER_PID=$!

# Wait for both processes
wait $CLIENT_PID $SERVER_PID
