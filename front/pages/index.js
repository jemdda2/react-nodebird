import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';

import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostsLading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,
    })
  }, [])

  useEffect(() => {
    // 스크롤이 어디까지 왔는지 판단
    function onScroll() {
      if (window.screenY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostsLading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [mainPosts, hasMorePost, loadPostsLading])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default Home;