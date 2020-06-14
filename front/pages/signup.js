import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
// import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

// const ErrorMessage = styled.dev`
// 	color: red;
// `;

const Signup = () => {
	const [id, onChangeId] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');

	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const onChangePasswordCheck = useCallback((e) =>{
		setPasswordCheck(e.target.value);
		setPasswordError(e.target.value !== password);
	}, [password])
	
	const [term, setTerm] = useState('');
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((e) =>{
		setTerm(e.target.checked);
		setTermError(false);
	}, [])

	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log(id, nickname, password);
	}, [password, passwordCheck, term])

	return (
		<AppLayout>
			<Head>
				<title>会員登録 | NodeBird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-id">ID</label>
					<br />
					<Input name="user-id" value={id} required onChange={onChangeId} />
				</div>
				<div>
					<label htmlFor="user-id">ニックネーム</label>
					<br />
					<Input name="user-id" value={nickname} required onChange={onChangeNickname} />
				</div>
				<div>
					<label htmlFor="user-id">パスワード</label>
					<br />
					<Input name="user-id" value={password} required onChange={onChangePassword} />
				</div>
				<div>
					<label htmlFor="user-id">パスワード確認</label>
					<br />
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>말을 잘 들을 것을 동의합니다.</Checkbox>
					{termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">가입하기</Button>
				</div>
			</Form>
		</AppLayout>
	);
};

export default Signup;
