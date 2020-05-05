navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(function(stream) {
    const localVideo = document.getElementById("local-video");

    if (localVideo) {
        localVideo.srcObject = stream;
    }
})
.catch(function(err){
    console.warn(error.message);
});