import Amplitude from "amplitudejs";
import classNames from "classnames";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentSong } from '../../store/musicSlice';
import "./index.css";

const PlayControls = memo(() => {
  // const musicStore = useSelector(state => state.music);
  const dispatch = useDispatch()
  // 定义一个控制是否播放的状态
  const [isPlaying, setIsPlaying] = useState(false);
  // 定义一个控制静音的状态
  const [isMuted, setIsMuted] = useState(false);
  // 定义一个控制是否随机播放的状态
  const [isShuffle, setIsShuffle] = useState(false);
  // 用于记录之前的音量
  let volume = 0;

  // 该方法用于切换播放状态
  function togglePlay() {
    // 可以获取当前的状态 playing、pasued、stopped
    const playState = Amplitude.getPlayerState();
    if (playState === "playing") {
      Amplitude.pause(); // 暂停播放
      setIsPlaying(false)
    } else if (playState === "paused" || playState === "stopped") {
      Amplitude.play(); // 开始播放
      setIsPlaying(true)
    }
  }

  // 该方法用于切换静音状态
  function toggleMute() {
    console.log("first");
    if (isMuted) {
      // 新版本的 Amplitude 没有提供静音方法，只提供了 setVolume 方法
      Amplitude.setVolume(volume); // 取消静音
      setIsMuted(false)
    } else {
      volume = Amplitude.getVolume(); // 获取当前音量
      Amplitude.setVolume(0); // 设置音量为 0
      setIsMuted(true)
    }
  }

  // 上一曲
  function prevSong() {
    Amplitude.prev();
    dispatch(updateCurrentSong())
  }

  // 下一曲
  function nextSong() {
    Amplitude.next();
    dispatch(updateCurrentSong())
  }

  // 切换随机播放状态
  function toggleShuffle() {
    // 获取当前的随机播放状态
    const shuffleState = Amplitude.getShuffle();
    if (shuffleState) {
      Amplitude.setShuffle(false); // 关闭随机播放
      setIsShuffle(false)
    } else {
      Amplitude.setShuffle(true); // 开启随机播放
      setIsShuffle(true)
    }
  }

  // 对应的进度条容器、声音进度条对应的宽度和显示
  const [progressContainerWidth, setProgressContainerWidth] = useState("100%");
  const [volumeContainerWidth, setVolumeContainerWidth] = useState("0%");
  const [volumeContainerDisplay, setVolumeContainerDisplay] = useState("none");

  // 当前歌曲的播放进度
  const [currentSongProgess] = useState(0);
  // 更新歌曲的播放进度
  function updateSongProgress() {
    // 首先第一步，我们需要计算播放进度的百分比
    const percentage = (currentSongProgess / 100) * Amplitude.getSongDuration();
    // 接下来再根据计算出来的百分比来设置播放进度
    Amplitude.setSongPlayedPercentage((percentage / Amplitude.getSongDuration()) * 100);
  }

  // 当前的音量
  const [currentVolume] = useState(Amplitude.getVolume());
  // 更新当前的音量
  function updateVolume() {
    Amplitude.setVolume(currentVolume.value);
  }

  // 显示音量控制
  function showVolumeControl() {
    setProgressContainerWidth("60%");
    setVolumeContainerWidth("35%");
    setVolumeContainerDisplay("block");
  }
  // 隐藏音量控制，就是上方显示音量控制的逆操作
  // function hideVolumeControl() {
  //   setProgressContainerWidth("100%");
  //   setVolumeContainerWidth("0%");
  //   setVolumeContainerDisplay("none");
  // }

  return (
    <div className="player_controls">
      {/* <!-- 控制面板上方部分 --> */}
      <div className="audio">
        <div className="play-container">
          {/* <!-- 播放按钮 --> */}
          <div className="playBtnContainer">
            <div
              className={classNames("playBtn amplitude-play-pause", {
                "amplitude-playing": isPlaying,
                "amplitude-paused": !isPlaying,
              })}
              onClick={togglePlay}
            ></div>
          </div>
          {/* <!-- 播放时间 --> */}
          <div className="time-container">
            {/* <!-- 当前时间 --> */}
            <span className="current-time">
              <span className="amplitude-current-minutes"></span>:<span className="amplitude-current-seconds"></span>
            </span>
            <span className="separator">/</span>
            {/* <!-- 总时长 --> */}
            <span className="duration">
              <span className="amplitude-duration-minutes"></span>:<span className="amplitude-duration-seconds"></span>
            </span>
          </div>
          {/* <!-- 播放进度 --> */}
          {/* <!-- 注意这里播放进度的滑块儿和音量控制的滑块儿在同一个 div 里面 --> */}
          <div className="progress-volume-container">
            {/* <!-- 播放进度滑块儿 --> */}
            <div className="progress-container" style={{ width: progressContainerWidth }}>
              <input type="range" value={currentSongProgess} onInput={updateSongProgress} />
            </div>
            {/* <!-- 音量控制滑块儿 --> */}
            <div
              className="volume-container"
              style={{
                width: volumeContainerWidth,
                display: volumeContainerDisplay,
              }}
            >
              <input type="range" value={currentVolume} onInput={updateVolume} />
            </div>
          </div>
          {/* <!-- 静音按钮 --> */}
          <div
            className={classNames("mute-button amplitude-mute", {
              "amplitude-muted": isMuted,
              "amplitude-not-muted": !isMuted,
            })}
            onClick={toggleMute}
            onMouseEnter={showVolumeControl}
          ></div>
        </div>
      </div>
      {/* <!-- 控制面板下方部分 --> */}
      <div className="addl-controls">
        <button className="prev btn" onClick={prevSong}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button
          className={classNames("shuffle btn", {
            "shuffle-active": isShuffle,
          })}
          onClick={toggleShuffle}
        >
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button className="next btn" onClick={nextSong}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
});

export default PlayControls;
