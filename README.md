# 2020/06/24
### back開発
* npm i express
* DB接続：npm i sequelize sequelize-cli mysql2
* 初期設定：npx sequelize init

### REST API
* app.get -> 가져오기
* app.post -> 생성하다
* app.put -> 전체 수정
* app.delete -> 제거
* app.patch -> 부분 수정
* app.options -> 찔러보기 (서버에 요청을 할수있는지 확인)
* app.head -> 헤더만 가져오기
* 애매할경우 post사용 예) 게시글 가져오면서 조회수 1을 올린다.
* rest 지키는 회사는 드물다..

### models
* db.User.hasMany(db.Post); // User 1 : Post N
* db.Post.belongsTo(db.User); // Post는 User가 속해있다(postテーブルにUserIdカラムを持つ)
* db.Post.belongsToMany(db.Hashteg) // Post N : Hashteg N
* 다대다 관계일 때는 중간 테이블에 양쪽 테이블의 값을 저장해줌

# 2020/06/23
### 기타
* npm i faker 더미데이터 만들때 사용
* placeholder.com 더미사진을 안쓰고 크기만 표시하고 싶을때
* window.scrollY = 얼마나 내렸는지
* document.documentElement.clientHeight = 화면 보이는 길이
* document.documentElement.scrollHeight = 화면 총 길이
* react virtualized = 무한스크롤할때 화면에것만 보여주고 나머지는 메모리로 빼주는 역활

# 2020/06/22
### CommentForm
* onSubmitComment(ADD_COMMENT_REQUEST) -> sagas -> reducers(ADD_COMMENT_SUCCESS) -> CommentFormのuseEffectを実行
* user reducers의 상태를 바꿀수 있는 액션을 만듬 -> post sagas에 addPost에 추가
* 지울때는 filter을 사용
* npm i immer 불변성

# 2020/06/17
### Redux-sagaを使う理由
* https://gracefullight.dev/2017/12/06/Why-redux-saga/
* LoginForm에서 로그인클릭 -> loginRequestAction실행(onSubmitForm) -> sagas/user login()、reducers/user LOG_IN_REQUEST 동시실행 -> login() 1초 후 성공하면 switch LOG_IN_SUCCESS 실행후 UserProfile로 넘어감

### function* ジェネレータ関数
* https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function*/

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