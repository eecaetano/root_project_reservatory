const socket = new WebSocket('ws://localhost:3000');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('vazao').innerText = data.vazao;
    document.getElementById('volume').innerText = data.volume;
};
