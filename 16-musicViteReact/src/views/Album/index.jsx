import Amplitude from "amplitudejs";
import classNames from "classnames";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./index.css";
const Album = memo(() => {
  const navigate = useNavigate();
  function backHomePage() {
    navigate(-1);
  }

  // 这里需要定义几个状态
  const [albumInfo, setAlbumInfo] = useState([]); //  存储专辑信息
  const [albumSongs, setAlbumSongs] = useState([]); //  存储专辑中的歌曲信息
  const [selectdAlbum, setSelectdAlbum] = useState(null); //  存储当前选中的专辑

  useEffect(() => {
    //  组织专辑相关的信息
    const songs = Amplitude.getConfig().songs; // 获取到所有的歌曲
    let uniqueAlbums = new Map();

    songs.forEach((song) => {
      if (!uniqueAlbums.has(song.album)) {
        // 如果当前的歌曲所对应的专辑不存在于 map 中
        // 那么我们就将其添加到 map 里面
        uniqueAlbums.set(song.album, {
          name: song.album,
          cover: song.cover_art_url,
          source: song.source,
        });
      }
    });

    // 操作完成后，我们再重新将其转为数组
    setAlbumInfo(Array.from(uniqueAlbums.values()));
  }, []);

  /**
   * 根据专辑的名称，需要筛选歌曲
   * @param {*} albumName
   */
  function selectAlbum(albumName) {
    const songs = Amplitude.getConfig().songs; // 获取到所有的歌曲
    setSelectdAlbum(albumName);
    setAlbumSongs(
      songs
        .filter((song) => song.album === albumName)
        .map((song) => ({
          ...song,
          globalIndex: songs.indexOf(song), // 记录你当前歌曲在全局中的一个索引
        }))
    );
  }

  // 根据传递进来的索引值播放对应的歌曲
  function playSong(index) {
    Amplitude.playSongAtIndex(index);
  }

  return (
    <div className="album-container">
      {/* <!-- 头部 --> */}
      <header className="album-header">
        <div className="title">专辑列表</div>
        <div className="closeAlbumBtn fa-solid fa-close" onClick={backHomePage}></div>
      </header>
      {/* <!-- 专辑列表 --> */}
      <ul className="album-list">
        {albumInfo.map((album) => (
          <li key={album.name} className="album-item" onClick={() => selectAlbum(album.name)}>
            {/* <!-- 专辑图片 --> */}
            <div className="item-left">
              <img src={album.cover} alt={album.name} />
            </div>
            {/* <!-- 专辑信息 --> */}
            <div className="item-right">
              <div>专辑：{album.name}</div>
              <div>歌手：网络歌手</div>
              <div>来源：{album.source}</div>
            </div>
          </li>
        ))}
      </ul>
      {/* <!-- 歌曲列表 --> */}
      <div
        className={classNames("song-container", {
          "show-song-list": selectdAlbum,
        })}
      >
        <dl className="song-list">
          <dt className="title-container flex">
            <div>音乐标题</div>
            <div>
              <div>歌手</div>
              <div>专辑</div>
            </div>
          </dt>
          {albumSongs.map((song) => (
            <dd key={song.globalIndex} className="song-item flex" onClick={() => playSong(song.globalIndex)}>
              <div>{song.name}</div>
              <div>
                <div>{song.artist}</div>
                <div>{song.album}</div>
              </div>
            </dd>
          ))}
        </dl>
        <div className="arrow-down fa-solid fa-angle-double-down" onClick={() => ( setSelectdAlbum(null))}></div>
      </div>
    </div>
  );
});

export default Album;
