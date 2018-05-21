import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink } from 'mdbreact';

const Header = () => (
  <Navbar color="green" light>
    <NavbarBrand href="/">
      <strong className="white-text">Qiiiita</strong>
    </NavbarBrand>
    <NavbarNav right>
      <NavItem>
        <NavLink to="/articles/new" className="white-text">投稿する</NavLink>
      </NavItem>
    </NavbarNav>
  </Navbar>
);

export default Header;
