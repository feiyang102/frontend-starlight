const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // 发送欢迎消息给客户端
  socket.send('Welcome to the WebSocket server!');

  // 监听客户端发来的消息
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`You said: ${message}`);
  });

  // 客户端断开连接时触发，客户端可以主动断开触发，也可以通过关闭页面触发
  socket.on('close', () => {
    console.log('Client disconnected');
  });

  setInterval(() => {
    socket.send('socket 服务端定时主动发送消息');
  }, 3000);
});

console.log('WebSocket server is running on port 3001');
