import React, { useCallback} from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
    const onLogOut = useCallback(() => {
            setIsLoggedIn(false);
        },[]);

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
            <Button onClick={onLogOut}>ログアウト</Button>
        </Card>
    );
};

export default UserProfile
