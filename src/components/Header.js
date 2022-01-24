import React from "react";
import aroundTheUS from "../images/around-the-us.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__image" src={aroundTheUS} alt="Around The U.S." />
    </header>
  );
}

export default Header;
