import React from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = () => {
    return (
        <Card
            actions={[
                <div key="twit">팩팩<br />8</div>,
                <div key="followings">팔로잉<br />8</div>,
                <div key="followings">팔로워<br />8</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>JS</Avatar>}
                title="JisoonKim"
            />
            <Button>ログアウト</Button>
        </Card>
    );
};

export default UserProfile
