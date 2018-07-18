import React from 'react';
import PropTypes from 'prop-types';

import Nav from './Nav';

export default function Header({ location }) {
  Header.propTypes = {
    location: PropTypes.object,
  };

  return (
    <Nav location={location} />
  );
}
