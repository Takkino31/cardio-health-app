const videoElement = document.querySelector("#videoElement");
const captureButton = document.querySelector("#captureButton");

// Obtenir le flux vidéo de la caméra
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        videoElement.srcObject = stream;
    })
    .catch(function(error) {
        console.log("Erreur lors de l'obtention du flux vidéo :", error);
    });

// Capture de la vidéo lorsque le bouton est cliqué
captureButton.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.getContext('2d').drawImage(videoElement, 0, 0);
    
    // Convertir le canvas en blob vidéo
    canvas.toBlob(function(blob) {
        // Envoyer le blob vidéo au serveur ou faire autre chose avec
        console.log("Blob vidéo capturé :", blob);
    }, 'video/webm'); // Changer le type MIME selon vos besoins
});
