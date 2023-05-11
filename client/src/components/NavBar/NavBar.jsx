import React, { useState } from 'react';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.threeDots} ${isMenuOpen && styles.active}`}
        onClick={handleToggleMenu}
      >
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.menu}>
          <a href="/" className={styles.link}>
            Link 1
          </a>
          <a href="/" className={styles.link}>
            Link 2
          </a>
          <a href="/" className={styles.link}>
            Link 3
          </a>
        </div>
      )}
      {isMenuOpen && (
        <div className={styles.backdrop} onClick={handleCloseMenu}></div>
      )}
    </>
  );
};

export default NavBar;
