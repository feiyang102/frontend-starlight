const WebSocket = require('ws');

// 创建 WebSocket 客户端实例
const ws = new WebSocket('ws://localhost:8080');

// 监听连接事件
ws.on('open', () => {
    console.log('Connected to WebSocket server');
    
    // 向服务器发送消息
    ws.send('Hello, server!测试测试');
});

// 监听消息事件
ws.on('message', (message) => {
    console.log(`Received from server: ${message}`);
});

// 监听关闭事件
ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
});
