import React from 'react';
// next router
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item><Link href="/"><a>Home</a></Link></Menu.Item>
                <Menu.Item><Link href="/profile"><a>My Profile</a></Link></Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item>
                <Menu.Item><Link href="/signup"><a>Signup</a></Link></Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    Left Menu
                </Col>
                <Col xs={24} md={12}>
                    { children }    
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