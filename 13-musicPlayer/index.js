// 获取 DOM 元素
const audio = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const songs = document.getElementsByTagName("li");
const currentSongName = document.getElementById("currentPlayingTrackName");
// 初始化播放音也的索引
let currentSong = 0;

// 设置初始歌曲源
audio.src = songs[currentSong].getAttribute("song");
currentSongName.textContent = songs[currentSong].textContent;

// 根据传入的索引值切换音乐
function setPlaying(index) {
  for (const song of songs) {
    song.classList.remove("playing");
  }
  songs[index].classList.add("playing");

  // 显示当前播放的歌曲名
  currentSongName.textContent = songs[index].textContent;

  audio.src = songs[index].getAttribute("song");
  audio.play();
}

playlist.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    currentSong = Array.from(songs).indexOf(e.target);
    setPlaying(currentSong);
  }
});

// 播放完毕后，自动播放下一首
audio.addEventListener("ended", () => {
  currentSong++;
  if (currentSong < songs.length) {
    setPlaying(currentSong);
  } else {
    currentSong = 0;
    setPlaying(currentSong);
  }
});

