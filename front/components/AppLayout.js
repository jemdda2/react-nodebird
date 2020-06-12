import React from 'react';
// next router
import Link from 'next/link';

const AppLayout = ({ children }) => {
    return (
        <div>
            <div>
                <Link href="/"><a>Home</a></Link>
                <Link href="/profile"><a>My Profile</a></Link>
                <Link href="/signup"><a>Signup</a></Link>
            </div>
            {children}
        </div>
    );
};

export default AppLayout;