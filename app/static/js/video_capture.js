document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const recordedVideo = document.getElementById('recordedVideo');
    const ecgCanvas = document.getElementById('ecgCanvas');
    const context = ecgCanvas.getContext('2d');
    let mediaRecorder;
    let recordedBlobs = [];

    // Fonction pour dessiner l'électrocardiogramme
    function drawECG(x, y) {
        context.beginPath();
        context.moveTo(x - 1, y - 1);
        context.lineTo(x, y);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
    }

    // Accéder à la caméra
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    recordedBlobs.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
                recordedVideo.src = window.URL.createObjectURL(superBuffer);
            
                // Données fictives pour l'ECG
                const ecgData = [
                    { x: 50, y: 150 },
                    { x: 100, y: 100 },
                    { x: 150, y: 120 },
                    { x: 200, y: 80 },
                    { x: 250, y: 110 },
                    { x: 300, y: 140 },
                    { x: 350, y: 90 },
                    { x: 400, y: 130 },
                    { x: 450, y: 100 },
                    { x: 500, y: 120 }
                ];
            
                ecgCanvas.width = 800; // Largeur du canevas en pixels
                ecgCanvas.height = 400; // Hauteur du canevas en pixels
                // Effacer le contenu précédent du canevas
                context.clearRect(0, 0, ecgCanvas.width, ecgCanvas.height);
                context.fillStyle = 'green';
                context.fillRect(0, 0, ecgCanvas.width, ecgCanvas.height);
            
                // Dessiner l'ECG sur le canevas
                context.beginPath();
                context.moveTo(ecgData[0].x, ecgData[0].y);
                context.strokeStyle = 'red';
                context.lineWidth = 2;
            
                ecgData.forEach((point, index) => {
                    console.log('Drawing ECG point at:', point.x, point.y);
                    context.lineTo(point.x, point.y);
                    context.stroke();
                });
            };
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });

    startButton.addEventListener('click', () => {
        if (mediaRecorder) {
            recordedBlobs = [];
            mediaRecorder.start();
            console.log('MediaRecorder started', mediaRecorder);
            startButton.disabled = true;
            stopButton.disabled = false;
        } else {
            console.error('MediaRecorder not initialized');
        }
    });

    stopButton.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            console.log('MediaRecorder stopped', mediaRecorder);
            startButton.disabled = false;
            stopButton.disabled = true;
        } else {
            console.error('MediaRecorder not recording');
        }
    });
});