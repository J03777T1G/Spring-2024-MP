const { SerialPort } = require('serialport');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

// Define the serial port configuration
const port = new SerialPort({ path: 'COM3', baudRate: 115200 });

// Create an HTTP server
const server = http.createServer();

// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Open the serial port and start reading data
port.on('open', () => {
  console.log('Device Monitor Begun');
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
  console.log('E-Alert:', serialData);
  
  // Write the serial data to a file
  fs.writeFile('serialData.json', JSON.stringify({ data: serialData }), (err) => {
    if (err) {
      console.error('Error writing serial data to file:', err);
    } else {
      console.log('Serial data written to file successfully');
    }
  });
});

// Serve the serial data file
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${server.address().port}`);
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
