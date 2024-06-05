document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const recordedVideo = document.getElementById('recordedVideo');

    let mediaRecorder;
    let recordedBlobs = [];

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

                // Envoyer la vidéo au serveur pour traitement
                const formData = new FormData();
                formData.append('video', superBuffer, 'recorded-video.webm');

                fetch('/process_video', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    alert('Heart Rate: ' + data.heart_rate);
                })
                .catch(error => {
                    console.error('Error:', error);
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
