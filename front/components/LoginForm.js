import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction  } from '../reducers/user';

import useInput from '../hooks/useInput';


const LoginForm = () => {
    const [email, onChangeEmail] = useInput('');
    const { loginLoading } = useSelector((state) => state.user);
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({ email, password }))
      }, [email, password]);

    return (
        <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-email">E-MAIL</label>
                <br />
                <Input name="user-email" value={email} onChange={onChangeEmail} required />
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
                <Button type="primary" htmlType="submit" loading={loginLoading}>ログイン</Button>
                <Link href="/signup"><a><Button>会員登録</Button></a></Link>
            </div>
        </Form>
    );
};

export default LoginForm;
