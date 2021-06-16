import { FC, useRef, useEffect, useState, ReactChild } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactChild;
}

const Portal: FC<Props> = ({ children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#modal");
    setMounted(true);
  }, []);

  if (ref.current !== null && mounted) {
    return createPortal(children, ref.current);
  }
  return null;
};

export default Portal;
