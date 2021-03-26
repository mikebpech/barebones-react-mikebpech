import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderWrap>
      <div className="content">
        <Heading className="header-title">NFTCanvas</Heading>
        <HeaderItems>
          <NavLink activeClassName="active" exact to="/" className="header-item"><i className="far fa-border-all"></i> Dashboard</NavLink>
          <NavLink activeClassName="active" to="/shop" className="header-item"><i className="far fa-store"></i> Shop</NavLink>
        </HeaderItems>
      </div>
    </HeaderWrap>
  )
}

export default Header;

const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1 1 0%;

  a.header-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-inline-start: var(--chakra-space-3);
    padding-inline-end: var(--chakra-space-3);
    padding-top: var(--chakra-space-2);
    padding-bottom: var(--chakra-space-2);
    border-radius: var(--chakra-radii-md);
    transition: all 0.2s ease 0s;

    &:not(:first-child) {
      margin-inline-start: var(--chakra-space-3);
      margin-top: var(--chakra-space-0);
    }
  }

  .active {
    background: var(--chakra-colors-blackAlpha-300);
    color: var(--chakra-colors-white);
  }

  i {
    margin-top: 2px;
    margin-right: 10px;
  }
`

const HeaderWrap = styled.header`
  background: var(--chakra-colors-blue-600);
  color: var(--chakra-colors-white);
  border-color: var(--chakra-colors-gray-200);

  .content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    padding-inline-start: var(--chakra-space-6);
    padding-inline-end: var(--chakra-space-6);
    align-items: center;
    overflow-wrap: break-word;
    height: var(--chakra-sizes-16);
  }

  .header-title {
    margin-inline-end: var(--chakra-space-10);
  }
`