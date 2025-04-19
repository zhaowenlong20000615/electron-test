import React, { memo } from "react";
import AlbumDetails from '../../components/AlbumDetails';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PlayControls from '../../components/PlayControls';
import './index.css';

const Home = memo(() => {

  return (
    <div id="music" className="music">
      <div className="music-player" id="music-player">
        <Header />
        <AlbumDetails />
      </div>
      <div>
        <PlayControls />
        <Footer />
      </div>
    </div>
  );
});

export default Home;
