export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
          id: 1,
          nickname: '제로초',
        },
        content: '첫 번째 게시글',
        img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        Comments: [],
      }], // 화면에 보일 포스트들
      imagePaths: [], // 미리보기 이미지 경로
      addPostErrorReason: '', // 포스트 업로드 실패 사유
      isAddingPost: false, // 포스트 업로드 중
      postAdded: false, // 포스트 업로드 성공
      isAddingComment: false,
      addCommentErrorReason: '',
      commentAdded: false,
    };

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: '제로초',
    },
    content: '나는 더미입니다.',
    Comments: [],
};
    
const dummyComment = {
    id: 1,
    User: {
        id: 1,
        nickname: '제로초',
    },
    createdAt: new Date(),
    content: '더미 댓글입니다.',
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
};

export default reducer;