# 2020/06/22
### CommentForm
* onSubmitComment(ADD_COMMENT_REQUEST) -> sagas -> reducers(ADD_COMMENT_SUCCESS) -> CommentFormのuseEffectを実行
* user reducers의 상태를 바꿀수 있는 액션을 만듬 -> post sagas에 addPost에 추가
* 지울때는 filter을 사용
* npm i immer 불편성

# 2020/06/17
### Redux-sagaを使う理由
* https://gracefullight.dev/2017/12/06/Why-redux-saga/
* LoginForm에서 로그인클릭 -> loginRequestAction실행(onSubmitForm) -> sagas/user login()、reducers/user LOG_IN_REQUEST 동시실행 -> login() 1초 후 성공하면 switch LOG_IN_SUCCESS 실행후 UserProfile로 넘어감

### function* ジェネレータ関数
* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function*


# 2020/06/16
### エラーメッセージ
* Error: NodeBird(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.　(returnがない)

### その他
* 配列にはKeyを入れる
* frontendを開発する時はデータの構造をbackendと相談

# 2020/06/15
### store/configureStore.js
* next設定

### redux
* action -> dispatch -> reducer(switch)
* reducer returnは新しいオブジェクト
* store: stateとreducer


# 2020/06/12
### AppLayout.js
* 一部の共通部分を処理
* gutter：column間の距離
* target="_black": 新しいブラウザで開く 

### _app.js
* ページの全部の共通部分を処理

### Nextjsを使う理由
* https://ojayyezzir.tistory.com/12#:~:text=Next.js%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94,%EC%9D%98%20%EC%B0%A8%EC%9D%B4%EB%A5%BC%20%EC%95%8C%EC%95%84%EB%B4%90%EC%95%BC%ED%95%9C%EB%8B%A4.