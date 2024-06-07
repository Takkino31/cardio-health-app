document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Récupérer les dimensions de la vidéo
    const videoWidth = video.width;
    const videoHeight = video.height;

    // Définir les dimensions du canevas
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Ajouter le canevas au conteneur de la vidéo
    videoContainer.appendChild(canvas);

    // Fonction pour dessiner le cardiogramme
    function drawCardiogram() {
        // Effacer le canevas
        context.clearRect(0, 0, videoWidth, videoHeight);

        // Dessiner le cardiogramme fictif
        const amplitude = videoHeight / 4; // Amplitude de l'onde
        const frequency = 0.01; // Fréquence de l'onde
        const speed = 1; // Vitesse de l'onde
        context.beginPath();
        for (let x = 0; x < videoWidth; x++) {
            const y = amplitude * Math.sin(frequency * x - speed * Date.now());
            context.lineTo(x, videoHeight / 2 + y);
        }
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();

        // Demander une nouvelle animation
        requestAnimationFrame(drawCardiogram);
    }

    // Démarrer l'animation du cardiogramme
    drawCardiogram();
});
