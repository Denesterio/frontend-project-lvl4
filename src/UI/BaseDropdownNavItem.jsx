import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  ButtonGroup,
  ButtonDropdown,
  NavLink,
  Tooltip,
} from 'reactstrap';

const BaseDropdownNavItem = ({
  item, deleteItem, renameItem, onClick,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const { t } = useTranslation();

  const isNameLong = item.name.length > 10;
  const name = isNameLong ? `${item.name.substr(0, 10).trim()}\u2026` : item.name;

  return (
    <ButtonGroup>
      <ButtonDropdown nav isOpen={dropdownOpen} toggle={toggle}>
        <NavLink id={`${item.name}${item.id}`} className="nav-item" onClick={onClick(item.id)}>{name}</NavLink>
        {isNameLong && (
          <Tooltip placement="right" isOpen={tooltipOpen} target={`${item.name}${item.id}`} toggle={toggleTooltip}>
            {item.name}
          </Tooltip>
        )}
        <DropdownToggle nav caret />
        <DropdownMenu>
          <DropdownItem onClick={renameItem(item.id)}>{t('rename')}</DropdownItem>
          <DropdownItem onClick={deleteItem(item.id)}>{t('delete')}</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ButtonGroup>
  );
};

export default BaseDropdownNavItem;
