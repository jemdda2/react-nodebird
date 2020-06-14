import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password]);

    return (
        <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-id">ID</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
            <   label htmlFor="user-password">PASSWORD</label>
                <br />
                <Input 
                    name="user-password" 
                    type="password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required 
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={false}>ログイン</Button>
                <Link href="/signup"><a><Button>会員登録</Button></a></Link>
            </div>
        </Form>
    );
};

LoginForm.prototype = {
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default LoginForm;
