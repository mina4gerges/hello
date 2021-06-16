/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

interface Props {
  children: string;
}

const ScreenReaderLabel: React.FC<Props> = ({ children }) => {
  return <span css={styles}>{children}</span>;
};

const styles = css`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export default ScreenReaderLabel;
