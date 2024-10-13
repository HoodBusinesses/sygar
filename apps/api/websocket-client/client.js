const { io } = require('socket.io-client'); // Import the socket.io-client

const socket = io('http://localhost:1337', {
    query: { userUid: '1' }, // Passing userUid as a query parameter
    transports: ['websocket'], // Specify WebSocket transport
	extraHeaders: {
        Authorization: `Bearer `, // Ensure you replace this with the actual token
    },
});

// Listening for connection
socket.on('connect', () => {
    console.log('Connected to WebSocket server');

    // Sending a test notification
    socket.emit('sendNotification', { userUid: '1', message: 'This is a test notification!' });
});

// Handling notifications
socket.on('notification', (data) => {
    console.log('Notification received:', data);
});

// Handling errors
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});
