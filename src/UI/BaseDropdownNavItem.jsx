import React, { useState } from 'react';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonGroup,
  ButtonDropdown,
  NavLink,
} from 'reactstrap';

const BaseDropdownNavItem = ({
  item, deleteItem, renameItem, onClick,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <ButtonGroup>
      <ButtonDropdown nav isOpen={dropdownOpen} toggle={toggle}>

        <NavLink className="nav-item" onClick={onClick(item.id)}>{item.name}</NavLink>

        <DropdownToggle nav caret />
        <DropdownMenu>
          <DropdownItem onClick={renameItem(item.id)}>Переименовать</DropdownItem>
          <DropdownItem onClick={deleteItem(item.id)}>Удалить</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ButtonGroup>
  );
};

export default BaseDropdownNavItem;
