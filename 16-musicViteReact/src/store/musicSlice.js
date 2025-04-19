import { createSlice } from '@reduxjs/toolkit';
import Amplitude from 'amplitudejs';

export const musicSlice = createSlice({
  name: 'counter',
  initialState: {
    albumCover: "", // 当前唱片封面
    albumTitle: "", // 当前唱片标题
    albumArtist: "", // 当前唱片艺术家
    navigationDirection: "forward", // 该状态用于跟踪导航的方向
  },
  reducers: {
    // 更新当前播放的歌曲信息
    updateCurrentSong: state => {
      // 获取当前正在播放的歌曲的信息
      const song = Amplitude.getActiveSongMetadata();
      
      // 然后进行一个更新操作
      state.albumCover = song.cover_art_url;
      state.albumTitle = song.name;
      state.albumArtist = song.artist;
    },
    // 设置导航方向
    // 回头导航的方向就两个是，回退是“backward”，而向前导航的方向是“forward”
    setNavigationDirection: (state, action) => {
      state.navigationDirection = action.direction;
    },
  }
})

export const { updateCurrentSong, setNavigationDirection } = musicSlice.actions

export default musicSlice.reducer