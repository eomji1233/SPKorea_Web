import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="logoEng">SPKOREA</p>
        <p className="logoKor">(주)에스피코리아</p>
        <div className="footer-sns">
          <a href="https://youtube.com/@v-tvkorea?si=BQ0cpDLWxUS-bsnU" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: '#FF0000' }}>
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-line">
          <p>본사 ㅣ 부산시 해운대구 센텀등로45, 1층 / 45, Centum dong-ro, Haeundae-gu, Busan</p>
          <p className="contact">070 8883 5120</p>
        </div>
        <div className="footer-line">
          <p>자사 ㅣ 서울시 강서구 마곡서로 205-21, 3층 / 205-21, Magokseo-ro, Gangseo-gu, Seoul</p>
          <p className="contact">spkoreaart@gmail.com</p>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} SPKOREA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
