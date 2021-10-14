import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const BaseNavItem = ({ item, onClick }) => (
  <NavItem className="nav-item">
    <NavLink onClick={onClick(item.id)}>{item.name}</NavLink>
  </NavItem>
);

export default BaseNavItem;
