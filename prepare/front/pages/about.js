import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
		<AppLayout>
			<Head>
				<title>JisoonKim | NodeBird</title>
			</Head>
			{userInfo
				? (
					<Card
						actions={[
							<div key="twit">
								짹짹
								<br />
								{userInfo.Posts}
							</div>,
							<div key="following">
								following
								<br />
								{userInfo.Followings}
							</div>,
							<div key="follower">
								follower
								<br />
								{userInfo.Followers}
							</div>,
						]}
					>
						<Card.Meta 
							avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
							title={userInfo.nickname}
							description="ノートマニア"
						/>
					</Card>
				)
				: null}
		</AppLayout>
  );
};

export const getStaticProps = wrapper.getServerSideProps(async (context) => {
	context.store.dispatch({
		type: LOAD_USER_REQUEST,
		data: 1,
	});
	context.store.dispatch(END); // 리퀘스트 성공 기다려주기위해서 
	await context.store.sagaTask.toPromise();
})

export default About;