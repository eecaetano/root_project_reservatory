document.addEventListener("DOMContentLoaded", function() {
    let initialVolume = 20; // Volume inicial em litros
    let flowRate = 10; // Vazão inicial fictícia em L/min
    let totalVolume = initialVolume;

    // Configuração dos gráficos
    const flowRateCtx = document.getElementById('flowRateChart').getContext('2d');
    const totalVolumeCtx = document.getElementById('totalVolumeChart').getContext('2d');

    const flowRateChart = new Chart(flowRateCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Vazão (L/min)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Tempo (s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Vazão (L/min)'
                    }
                }
            }
        }
    });

    const totalVolumeChart = new Chart(totalVolumeCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Volume Total (L)',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Tempo (s)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Volume Total (L)'
                    }
                }
            }
        }
    });

    let time = 0;

    // Função para simular a retirada de água
    function simulateWaterUsage() {
        if (totalVolume > 0) {
            totalVolume -= flowRate / 60; // Reduz volume com base na vazão por segundo
            if (totalVolume < 0) totalVolume = 0; // Evita volume negativo
        }
        document.getElementById("flow-rate").textContent = `${flowRate} L/min`;
        document.getElementById("total-volume").textContent = `${totalVolume.toFixed(2)} L`;

        // Atualiza os gráficos
        flowRateChart.data.labels.push(time);
        flowRateChart.data.datasets[0].data.push(flowRate);
        flowRateChart.update();

        totalVolumeChart.data.labels.push(time);
        totalVolumeChart.data.datasets[0].data.push(totalVolume);
        totalVolumeChart.update();

        time++;
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
