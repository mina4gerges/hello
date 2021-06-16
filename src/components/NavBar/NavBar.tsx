import React, { useState, useEffect } from "react";
import DesktopNav from "./Desktop";
import MobileNav from "./Mobile";

const mediaQuery = "screen and (min-width: 768px)";

const NavBar: React.FC = () => {
  const mql = window.matchMedia(mediaQuery);
  const [showDesktopMenu, setShowDesktopMenu] = useState(mql.matches);

  useEffect(() => {
    const handleMediaChange = function(this: MediaQueryList) {
      setShowDesktopMenu(this.matches);
    };
    mql.addEventListener("change", handleMediaChange);
    setShowDesktopMenu(mql.matches);

    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [mql]);

  if (showDesktopMenu) {
    return <DesktopNav />;
  }
  return <MobileNav />;
};

export default NavBar;
