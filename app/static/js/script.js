const video = document.querySelector("#videoElement");
const captureButton = document.querySelector("#capture");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.log("Something went wrong!");
    });
}

captureButton.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('video', blob, 'video.jpg');

        fetch('/process_video', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Heart Rate: ' + data.heart_rate);
        });
    }, 'image/jpeg');
});
