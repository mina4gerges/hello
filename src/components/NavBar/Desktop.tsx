/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import { menu } from "../../constants/menu";

const DesktopNav: FC = () => {
  return (
    <nav css={styles}>
      {menu.map(menuItem => (
        <Link key={menuItem.route} to={menuItem.route}>
          {menuItem.title}
          <span className="isFocused" aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
};

const styles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px;
  mix-blend-mode: difference;

  & > a {
    color: white;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    padding: 0 5px;
    margin: 0 30px;
    display: flex;
    flex-direction: column;

    & > .isFocused {
      border-bottom: 1px solid white;
      transform: scaleX(0);
      transition: transform ease-out 200ms;
    }
  }

  & > a:hover,
  & > a:focus {
    outline: none;
    & > .isFocused {
      transform: scaleX(1);
    }
  }
`;

export default DesktopNav;
