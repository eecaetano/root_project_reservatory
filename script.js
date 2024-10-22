cdocument.addEventListener("DOMContentLoaded", function() {
    let initialVolume = 20; // Volume inicial em litros
    let flowRate = 10; // Vazão inicial fictícia em L/min
    let totalVolume = initialVolume;

    // Função para simular a retirada de água
    function simulateWaterUsage() {
        if (totalVolume > 0) {
            totalVolume -= flowRate / 60; // Reduz volume com base na vazão por segundo
            if (totalVolume < 0) totalVolume = 0; // Evita volume negativo
        }
        document.getElementById("flow-rate").textContent = `${flowRate} L/min`;
        document.getElementById("total-volume").textContent = `${totalVolume.toFixed(2)} L`;
    }

    // Simula a retirada de água a cada segundo
    setInterval(simulateWaterUsage, 1000);

    // Função para atualizar os dados reais quando a conexão for estabelecida
    function updateRealData() {
        fetch("/data")
            .then(response => response.text())
            .then(data => {
                const lines = data.trim().split("\n");
                const flowRate = lines[lines.length - 1];
                const totalVolume = lines.reduce((acc, val) => acc + parseInt(val), 0);
                document.getElementById("flow-rate").textContent = `${flowRate} cm`;
                document.getElementById("total-volume").textContent = `${totalVolume} cm`;
            });
    }

    // Tenta atualizar os dados reais a cada 10 segundos
    setInterval(updateRealData, 10000);
});
