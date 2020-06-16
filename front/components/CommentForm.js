import { Form, Input, Button } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const onSubmitComment = useCallback((e) => {
        setCommentText(e.target.value);
    },[]);
    const onChangeCommentText = useCallback(() =>{
        console.log(post.id, commentText);
        
    }, [commentText]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 8 }}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    );
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;