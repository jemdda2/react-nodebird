# 2020/07/13
### Next サーバーサイドレンダリング方法
* getServerSideProps実行 => context.store.dispatch(実行された結果) => reducers/index.js case HYDRATE実行 => 

# 2020/07/08
### サーバーへイミージファイルを送る時
* npm i multer：encType="multipart/form-data"形式など。。routerにインポート
* const fs = require('fs')：フォルダ作成可能
* (express.static('/', path.join(__dirname, 'uploads')))を使うとOSに合わせて自動でpath設定

# 2020/07/02
### ログイン2
* 데이터 효율을 위해서 유저정보 포스트, 팔로워, 팔로잉은 id만 가져온다(전체내용을 가져오면 무거워짐)
* lastId limit방식으로해야 가운데에서 지워져도 데이터가 안꼬임
* npm i morgan 프론트엔드에서 벡엔드로 어떤 요청을 보냈는지 콘설창에 뜸
* routes 다른모델 포함하고 싶을때 include 취득하고싶은 칼럼지정하고싶을때 attributes: [] 

# 2020/07/02
### ログイン1
* sagas/index.js axios.defaults.baseURLを使うと 'http://localhost:' 省略可能
* npm i passport passport-local ログイン管理
* async일때는 꼭 try catch를 해줌
* session, cookie이 필요한이유：로그인하면 브러우저와 서버가 같은정보를 들고있어야함
* 서버쪽에 들고있는건 session、프론트쪽에는 cookie로 랜덤한문자를 들고있어서 보안위협을 최소화한다
* npm i express-session 
* npm i cookie-parser
* npm i dotenv 중요정보관리 db passwordなど
* Response Headers의 Set-Cookie가 유저정보
* middlewares.js 로그인했는지 안했는지 검사하는 미들웨어
* next(); 다음 미들웨어로감 next(err);일땐 에러를 리턴
* 도메인이 다르면 쿠키가 전달안됌(3060 -> 3065) app.js use.cors에 credentials: true 추가해서 해결
* saga/index.js에 axios.defaults.withCredentials = true 추가해서 공통으로 적용

# 2020/06/29
### back開発3
* npm i bcrypt パスワード暗号化
* CORS에러 브라우저에서 벡엔드 서버갈때만 생김
* proxy 브라우저 -> 프론트서버 -> 벡엔드서버
* 브라우저에서 접근허용：res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060');
* npm i cors 위에처럼 안쓰고 이걸사용

# 2020/06/29
### back開発2
* npx sequelize db:create dbカラム作成
* DataGrip
* npm i -D nodemon@2 
* "dev": "nodemon app" package.json에 추가

# 2020/06/24
### back開発1
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