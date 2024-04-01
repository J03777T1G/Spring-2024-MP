const { SerialPort } = require('serialport');
const WebSocket = require('ws');

// Define the serial port configuration
const port = new SerialPort({ path: 'COM3', baudRate: 115200 });

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }); // WebSocket server listens on port 8080

// Open the serial port and start reading data
port.on('open', () => {
  console.log('Serial port opened');
});

port.on('error', (err) => {
  console.error('Error:', err.message);
});

port.on('data', (data) => {
  // Convert buffer data to string
  const serialData = data.toString().trim();

  // Broadcast serial data to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(serialData);
    }
  });

  // Log serial data
  console.log('Serial data:', serialData);
});

// WebSocket server event handlers
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Handle WebSocket client messages (if needed)
  ws.on('message', (message) => {
    console.log('Received message from WebSocket client:', message);
  });

  // Handle WebSocket client disconnection (if needed)
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
