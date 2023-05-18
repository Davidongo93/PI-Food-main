import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ThreeDotsMenu.module.css';

const ThreeDotsMenu = () => {
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
        onClick={handleToggleMenu} // Agregamos el evento onClick
      >
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.menu} onClick={handleToggleMenu}>
          <Link to="/create" className={styles.link}>
            Create new recipe
          </Link>
          <hr />
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <hr />
          <Link to="/" className={styles.link}>
            Back to landing page
          </Link>
        </div>
      )}
      {isMenuOpen && (
        <div className={styles.backdrop} onClick={handleCloseMenu}></div>
      )}
    </>
  );
};

export default ThreeDotsMenu;
