import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameeEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  });

  return (
    <Form
      style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}
      onFinish={onSubmit}
    >
      <Input.Search 
        value={nickname} 
        onChange={onChangeNickname}
        addonBefore="NickName" 
        enterButton="修正" 
      />
    </Form>
  );
};

export default NicknameeEditForm;