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

### nextjsを使う理由
* https://ojayyezzir.tistory.com/12#:~:text=Next.js%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94,%EC%9D%98%20%EC%B0%A8%EC%9D%B4%EB%A5%BC%20%EC%95%8C%EC%95%84%EB%B4%90%EC%95%BC%ED%95%9C%EB%8B%A4.