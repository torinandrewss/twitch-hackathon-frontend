import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Spinner = ({ size = '2rem', color = 'primary' }) => {
  return (
    <StyledSpinner
      animation="border"
      role="status"
      variant={color}
      size={size}
    />
  );
};

export default Spinner;

const StyledSpinner = styled(BootstrapSpinner)`
  width: ${(props) => props.size || '2rem'};
  height: ${(props) => props.size || '2rem'};
  border-width: 0.25em;
`;
