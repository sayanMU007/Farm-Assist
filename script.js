
let sensorData = {
    temperature: 25,
    humidity: 65,
    timestamp: new Date().toISOString()
};

const recommendations = [
    { name: "Rice", confidence: 95, expectedYield: "5-6 tons/hectare", idealConditions: { temperature: "24-30°C", humidity: "60-80%" } },
    { name: "Maize", confidence: 85, expectedYield: "8-10 tons/hectare", idealConditions: { temperature: "20-30°C", humidity: "50-80%" } },
    { name: "Soybeans", confidence: 75, expectedYield: "2.5-3.5 tons/hectare", idealConditions: { temperature: "20-30°C", humidity: "60-70%" } }
];

function updateSensorDisplays() {
    document.getElementById('temperature').textContent = `${sensorData.temperature.toFixed(1)}°C`;
    document.getElementById('humidity').textContent = `${sensorData.humidity.toFixed(1)}%`;
    document.getElementById('lastUpdated').textContent = `Last updated: ${new Date(sensorData.timestamp).toLocaleTimeString()}`;
}

function renderRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = recommendations.map(crop => `
        <div class="crop-item">
            <h3>${crop.name}</h3>
            <p>Expected Yield: ${crop.expectedYield}</p>
            <p>Confidence: ${crop.confidence}%</p>
            <p>Ideal Temperature: ${crop.idealConditions.temperature}</p>
            <p>Ideal Humidity: ${crop.idealConditions.humidity}</p>
        </div>
    `).join('');
}

async function connectToBluetooth() {
    try {
        console.log('Requesting Bluetooth Device...');
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['environmental_sensing']
        });

        console.log('Connecting to GATT Server...');
        const server = await device.gatt.connect();

        console.log('Getting Environmental Sensing Service...');
        const service = await server.getPrimaryService('environmental_sensing');

        console.log('Getting Temperature Characteristic...');
        const tempCharacteristic = await service.getCharacteristic('temperature');
        const tempValue = await tempCharacteristic.readValue();
        sensorData.temperature = tempValue.getUint8(0);

        console.log('Getting Humidity Characteristic...');
        const humidityCharacteristic = await service.getCharacteristic('humidity');
        const humidityValue = await humidityCharacteristic.readValue();
        sensorData.humidity = humidityValue.getUint8(0);
        
        sensorData.timestamp = new Date().toISOString();
        updateSensorDisplays();
        document.getElementById('dataDisplay').innerText = `Sensor Data Updated`;
    } catch (error) {
        console.error('Bluetooth Error:', error);
        document.getElementById('dataDisplay').innerText = 'Failed to connect to sensor';
    }
}

document.getElementById('connectButton').addEventListener('click', connectToBluetooth);

document.addEventListener('DOMContentLoaded', () => {
    updateSensorDisplays();
    renderRecommendations();
});
