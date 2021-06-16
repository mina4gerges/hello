/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { forwardRef, useImperativeHandle, RefForwardingComponent } from "react";
import useMenuButtonTransition from "../hooks/useMenuButtonTransition";
import ScreenReaderLabel from "./ScreenReaderLabel";

interface Props {
  onClick: (e: React.MouseEvent) => void;
}

export interface MenuButtonRef {
  triggerTransition(): void;
}

const MenuButton: RefForwardingComponent<MenuButtonRef, Props> = (
  { onClick },
  ref
) => {
  const { pathA, pathB, pathC, triggerTransition } = useMenuButtonTransition();

  useImperativeHandle(
    ref,
    () => ({
      triggerTransition
    }),
    [triggerTransition]
  );

  return (
    <button
      css={styles}
      id="primary-menu-button"
      onClick={onClick}
      className="menu-icon-trigger"
    >
      <svg width="1000px" height="1000px" aria-hidden="true" focusable="false">
        <path
          ref={pathA}
          d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
        />
        <path ref={pathB} d="M 300 500 L 700 500" />
        <path
          ref={pathC}
          d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
        />
      </svg>
      <ScreenReaderLabel>Menu</ScreenReaderLabel>
    </button>
  );
};

const styles = css`
  position: fixed;
  display: inline-block;
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  right: 20px;
  top: 20px;
  mix-blend-mode: difference;
  z-index: 12;

  &:focus {
    outline: 1px solid white;
  }

  svg {
    transform: scale(0.1) translate(-390px, -330px);
    transform-origin: 0 0;
  }

  svg path {
    stroke: white;
    stroke-width: 60px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: transparent;
  }
`;

export default forwardRef(MenuButton);
