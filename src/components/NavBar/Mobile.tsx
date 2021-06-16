/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import MenuButton, { MenuButtonRef } from "../../components/MenuButton";

import { menu } from "../../constants/menu";

const MobileNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<MenuButtonRef>(null);

  const toggleMenu = () => {
    setMenuOpen((prevState: boolean) => !prevState);
    if (menuButtonRef.current) {
      menuButtonRef.current.triggerTransition();
    }
  };

  return (
    <Fragment>
      <MenuButton ref={menuButtonRef} onClick={toggleMenu} />
      <Modal
        classNames="menu-transition"
        handleClose={toggleMenu}
        isOpen={menuOpen}
        transitionStyles={transitionStyles}
      >
        <nav css={styles}>
          {menu.map((menuItem, index) => (
            <Link
              key={menuItem.route}
              to={menuItem.route}
              className={`menu-item-${index}`}
              onClick={toggleMenu}
            >
              {menuItem.title}
            </Link>
          ))}
        </nav>
      </Modal>
    </Fragment>
  );
};

const styles = css`
  background-color: #010101;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: #595b5b;
    font-size: 32px;
    line-height: 40px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-decoration: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }

  a:hover,
  a:focus {
    color: white;
    cursor: pointer;
    outline: none;
  }

  .rsvp {
    position: absolute;
    bottom: 40px;
    border: 2px #595b5b solid;
    width: auto;
    padding: 5px 50px;
  }

  .rsvp:hover,
  .rsvp:focus {
    border-color: white;
  }
`;

const transitionStyles = css`
  .menu-transition-enter {
    transform: translateX(-100%);

    a {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  .menu-transition-enter-active {
    transform: translateX(0);
    transition: transform 300ms;
  }
  .menu-transition-enter-done {
    a {
      opacity: 1;
      transform: translateY(0px);
      transition: opacity 200ms linear, transform 500ms ease-out;
    }
    .menu-item-0 {
      transition-delay: 0ms;
    }
    .menu-item-1 {
      transition-delay: 50ms;
    }
    .menu-item-2 {
      transition-delay: 100ms;
    }
    .menu-item-3 {
      transition-delay: 250ms;
    }
  }
  .menu-transition-exit {
    transform: translateX(0);
  }
  .menu-transition-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms;
  }
`;

export default MobileNav;
