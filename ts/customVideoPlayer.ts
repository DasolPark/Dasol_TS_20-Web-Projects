const video = document.getElementById('video') as HTMLVideoElement;
const progressRange = document.getElementById(
  'progressRange'
) as HTMLInputElement;
const playBtn = document.getElementById('play') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const volumeBtn = document.getElementById('volumeBtn') as HTMLButtonElement;
const volumeRange = document.getElementById('volume') as HTMLInputElement;
const fullScreen = document.getElementById('fullScreen') as HTMLButtonElement;
const timestamp = document.getElementById('timestamp') as HTMLSpanElement;
const openBtn = document.getElementById('open') as HTMLButtonElement;
const closeBtn = document.getElementById('close') as HTMLButtonElement;
const menuSlider = document.getElementById('menu-slider') as HTMLDivElement;

video.volume = 0.5;

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  if (!video.paused) {
    (playBtn.querySelector('.fa-play') as HTMLElement).className =
      'fa fa-pause';
  } else {
    (playBtn.querySelector('.fa-pause') as HTMLElement).className =
      'fa fa-play';
  }
}

// Stop video
function stopVideo() {
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
  } else {
    video.currentTime = 0;
  }
}

// Update progressRange and timestamp
function updateProgress() {
  const progressValue = (video.currentTime / video.duration) * 100;
  progressRange.value = progressValue.toString();

  // timestamp를 뽑아낼 때, 증감량과 분리해서 로직 작성할 것(실수/정수)
  const hours = Math.floor(video.currentTime / 60 / 60);
  const mins = Math.floor((video.currentTime / 60) % 60);
  const secs = Math.floor(video.currentTime % 60);

  timestamp.innerHTML = `
    ${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}:${
    secs < 10 ? '0' + secs : secs
  }
  `;
}

// Update video ended status
function updateVideoEnded() {
  (playBtn.querySelector('.fa-pause') as HTMLElement).className = 'fa fa-play';
  progressRange.value = '0';
}

function setVideoProgress() {
  video.currentTime = (+progressRange.value * video.duration) / 100;
}

// Update volume range
function updateVolumeValue(e: Event) {
  const value = +(e.target as HTMLInputElement).value;
  video.volume = value;

  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fa fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fa fa-volume-off"></i>';
  }
}

function updateVolumeStatus(e: Event) {
  if (video.muted) {
    video.muted = false;
    volumeBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
    volumeRange.value = String(video.volume);
  } else {
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

// Event listeners
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

openBtn.addEventListener('click', () => {
  menuSlider.style.minHeight = `${document.documentElement.scrollHeight}px`;
  menuSlider.classList.toggle('show');
});
closeBtn.addEventListener('click', () => {
  menuSlider.classList.toggle('show');
});
