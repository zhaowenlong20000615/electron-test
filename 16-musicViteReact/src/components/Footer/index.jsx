import React, { memo } from "react";
import "./index.css";

const Footer = memo(() => {
  return (
    <div className="footer">
      <p className="source_name">Source: 音乐库</p>
      <p className="license_number">License: MIT</p>
    </div>
  );
});

export default Footer;
