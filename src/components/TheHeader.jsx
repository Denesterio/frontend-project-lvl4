import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, NavbarBrand } from 'reactstrap';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import BaseButton from '../UI/BaseButton.jsx';

const TheHeader = () => {
  const { logout } = useAuthContext();
  const history = useHistory();
  const logoutUser = () => {
    logout();
    history.push('/login');
  };
  const { t } = useTranslation();

  return (
    <Navbar color="light" expand="lg" light className="justify-content-between">
      <NavbarBrand href="/">Chat</NavbarBrand>
      <BaseButton onClick={logoutUser} className="btn-info">{ t('logout') }</BaseButton>
    </Navbar>
  );
};

export default TheHeader;
