import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import './index.css';

const Header = memo(() => {
  const navigator = useNavigate();
  function goToAlbum() {
    navigator("/album");
  }
  return (
    <div className="main-header">
    {/* <!-- 左侧logo --> */}
    <img src="/src/assets/images/logo.png" alt="logo" className="logo_img" />
    {/* <!-- 中间标题 --> */}
    <div className="header-cont">
      <h2 className="header-title">Music Player</h2>
      <h5 className="sub-header-title">Your Melodic Companion</h5>
    </div>
    {/* <!-- 右侧菜单按钮 --> */}
    <button className="menu-btn" onClick={goToAlbum}>
      <i className="fa-solid fa-bars"></i>
    </button>
  </div>
  )
})

export default Header