import React from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameeEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList = [{ nickname: 'Jisoon'}, { nickname: 'Kim'}, { nickname: 'Lee'}];
    const followingList = [{ nickname: 'Jisoon'}, { nickname: 'Kim'}, { nickname: 'Lee'}];

    return (
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로워 목록" data={followingList} />
            <FollowList header="팔로잉 목록" data={followerList} />
        </AppLayout>
    );
};

export default Profile;