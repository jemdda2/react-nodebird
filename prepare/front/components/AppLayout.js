import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm'
import useInput from '../hooks/useInput';

const SerchInput = styled(Input.Search)`
  vartical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item><Link href="/"><a>Home</a></Link></Menu.Item>
        <Menu.Item><Link href="/profile"><a>My Profile</a></Link></Menu.Item>
        <Menu.Item>
          <SerchInput 
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item><Link href="/signup"><a>Signup</a></Link></Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}    
        </Col>
        <Col xs={24} md={6}>
          <a href="https://jemdda2.github.io/Real-Estate-Website/" target="_black" rel="noreferrer noopener">Made by JisoonKim</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;