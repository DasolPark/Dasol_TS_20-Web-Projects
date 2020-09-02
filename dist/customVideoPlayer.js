"use strict";
var video = document.getElementById('video');
var progressRange = document.getElementById('progressRange');
var playBtn = document.getElementById('play');
var stopBtn = document.getElementById('stop');
var volumeBtn = document.getElementById('volumeBtn');
var volumeRange = document.getElementById('volume');
var fullScreen = document.getElementById('fullScreen');
var timestamp = document.getElementById('timestamp');
var openBtn = document.getElementById('open');
var closeBtn = document.getElementById('close');
var menuSlider = document.getElementById('menu-slider');
video.volume = 0.5;
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}
function updatePlayIcon() {
    if (!video.paused) {
        playBtn.querySelector('.fa-play').className =
            'fa fa-pause';
    }
    else {
        playBtn.querySelector('.fa-pause').className =
            'fa fa-play';
    }
}
function stopVideo() {
    if (!video.paused) {
        video.pause();
        video.currentTime = 0;
    }
    else {
        video.currentTime = 0;
    }
}
function updateProgress() {
    var progressValue = (video.currentTime / video.duration) * 100;
    progressRange.value = progressValue.toString();
    var hours = Math.floor(video.currentTime / 60 / 60);
    var mins = Math.floor((video.currentTime / 60) % 60);
    var secs = Math.floor(video.currentTime % 60);
    timestamp.innerHTML = "\n    " + (hours < 10 ? '0' + hours : hours) + ":" + (mins < 10 ? '0' + mins : mins) + ":" + (secs < 10 ? '0' + secs : secs) + "\n  ";
}
function updateVideoEnded() {
    playBtn.querySelector('.fa-pause').className = 'fa fa-play';
    progressRange.value = '0';
}
function setVideoProgress() {
    video.currentTime = (+progressRange.value * video.duration) / 100;
}
function updateVolumeValue(e) {
    var value = +e.target.value;
    video.volume = value;
    if (value >= 0.6) {
        volumeBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
    }
    else if (value >= 0.2) {
        volumeBtn.innerHTML = '<i class="fa fa-volume-down"></i>';
    }
    else {
        volumeBtn.innerHTML = '<i class="fa fa-volume-off"></i>';
    }
}
function updateVolumeStatus(e) {
    if (video.muted) {
        video.muted = false;
        volumeBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
        volumeRange.value = String(video.volume);
    }
    else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="fa fa-volume-mute"></i>';
        volumeRange.value = '0';
    }
}
function updateFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
}
playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('ended', updateVideoEnded);
video.addEventListener('timeupdate', updateProgress);
progressRange.addEventListener('click', setVideoProgress);
volumeBtn.addEventListener('click', updateVolumeStatus);
volumeRange.addEventListener('input', updateVolumeValue);
fullScreen.addEventListener('click', updateFullScreen);
openBtn.addEventListener('click', function () {
    menuSlider.style.minHeight = document.documentElement.scrollHeight + "px";
    menuSlider.classList.toggle('show');
});
closeBtn.addEventListener('click', function () {
    menuSlider.classList.toggle('show');
});
