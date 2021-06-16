/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FC, ReactChild } from "react";

interface Props {
  children: ReactChild;
}

const PageSection: FC<Props> = ({ children }) => (
  <section css={styles}>{children}</section>
);

const styles = css`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default PageSection;
