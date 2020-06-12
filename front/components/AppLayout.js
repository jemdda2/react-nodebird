import React from 'react';
// next router
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu node="horizontal">
                <Menu.Item>
                    <Link href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>My Profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>Signup</a></Link>
                </Menu.Item>
            </Menu>
            {children}
        </div>
    );
};

export default AppLayout;