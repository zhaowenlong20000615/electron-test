import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentSong } from "../../store/musicSlice";
import "./index.css";

const AlbumDetails = memo(() => {
  const musicStore = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentSong());
  }, [dispatch]);

  return (
    <>
      {musicStore.albumCover && (
        <>
          {/* // <!-- 唱片详情 --> */}
          <div className="album-details">
            {/* <!-- 唱片封面图 --> */}
            <div className="image">
              <img alt="default album image" className="album_img" src={musicStore.albumCover} loading="eager" />
            </div>
            {/* <!-- 唱片作者信息 --> */}
            <div className="title-and-author">
              <div className="album_title">{musicStore.albumTitle}</div>
              <div className="artlist">{musicStore.albumArtist}</div>
            </div>
          </div>
          {/* // <!-- 移动歌曲名称 --> */}
          <div className="running-song-title">{musicStore.albumTitle}</div>
        </>
      )}
    </>
  );
});

export default AlbumDetails;
