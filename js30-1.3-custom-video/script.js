const player = document.querySelector('.player');
const video = player.querySelector('.player__video');

const primaryPlayBtn = player.querySelector('.btn-play-video');
const secondaryPlayBtn = player.querySelector('.btn-play-video-control');
const volumeBtn = player.querySelector('.btn-volume');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const volume = player.querySelector('.player__slider');

const togglePlay = () => {
    if (video.paused) {
        video.play();
        primaryPlayBtn.classList.add('hide');
        secondaryPlayBtn.style.backgroundImage = 'url(./assets/svg/pause.svg)';
    } else {
        video.pause();
        primaryPlayBtn.classList.remove('hide');
        secondaryPlayBtn.style.backgroundImage = 'url(./assets/svg/play.svg)';
    }
}

function changeVolume(vol) {
    video.volume = vol;
    let grVol = `${vol * 100}%`;
    document.documentElement.style.setProperty('--ival', grVol);
    if (Number(vol) === 0) {
        volumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)';
    } else {
        volumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)';
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mousedown = false;

primaryPlayBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
secondaryPlayBtn.addEventListener('click', togglePlay);

let volumeValue = video.volume;
volume.addEventListener('mousemove', () => {
    if (mousedown) {
        volumeValue = volume.value;
        document.documentElement.style.setProperty('--ival', `${volumeValue * 100}%`);
        changeVolume(volume.value);
    }
});
volume.addEventListener('click', () => {
    volumeValue = volume.value;
    document.documentElement.style.setProperty('--ival', `${volumeValue * 100}%`);
    changeVolume(volume.value);
});
volume.addEventListener('mousedown', () => mousedown = true);
volume.addEventListener('mouseup', () => mousedown = false);
volumeBtn.addEventListener('click', () => {
    if(video.volume > 0) {
        changeVolume(0);
    } else {
        changeVolume(volumeValue);
    }
});

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

