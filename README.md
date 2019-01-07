# 暗号通貨チャート

## 開発内容

* 暗号通貨ビットコインの24時間の相場チャートを作ります
* マーケットキャップと履歴データを取得します
* こちらが動く参考：[CryptoCurrency Mini App](http://crypto.thirdtape.com/)

## 開発方針

* クライアントサイドとサーバサイドを開発します
* グラフの描画には[vue-chartjs](https://vue-chartjs.org/#/)を利用します
* サーバサイドはExpressJSです
* 第三者が提供している無料のAPIを使用します
  * https://coinmarketcap.com/api/
  * https://min-api.cryptocompare.com/
* サーバ側で、第三者提供APIからデータを取得してクライアントに返します。（様々な新しいモジュールも使用します）

頑張ってください！

## コンテンツ：

* [Month 2 Git Workflow](https://github.com/bootcamp-tpa/tpa-resources/wiki/%5B%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC%5D-2%E3%83%B6%E6%9C%88%E7%9B%AE%E3%81%AEGit-Workflow)
* Checkpoints
  * [Checkpoint 1 README](#checkpoint-1)
  * [Checkpoint 2 README](#checkpoint-2)
  * [Checkpoint 3 README](#checkpoint-3)
  * [Checkpoint 4 README](#checkpoint-4)
  * [Checkpoint 5 README](#checkpoint-5)
* [Starting the App](#starting-the-app)

***

# Checkpoint-1

**タスク：**

* コンポーネント設計をしとこう
  * 設計をレポジトリのmemoフォルダーに追加しよう（手書きメモの写真でもOK、画面のスクリーンショットに描くのもOK）
  * チャート自体はライブラリに任せてOK
  * 現在のHTMLをコンポーネント化しとこう
  * ６個の箱コンポーネントのデータ型を定義しとこう
  * コンポーネントに定義したデータを渡しとこう
  * まだChartコンポーネントのデータ型はわからないから置いとく
* API を叩いてみよう
  * このタスクはコードを書かなくてもOKです。でも、APIを叩いて、リクエスト・レスポンスなどの情報を`server/api-service.js`にメモをしとくのがおすすめです
  * APIを試すときは、今回はPOSTMANかNodeJS（サーバ）を使用してください。coinmarketcap.comは”CORS”ヘッダーをレスポンスに定義してくれないので、ブラウザ上でレスポンスが使用できません。（ブラウザのセキュリティー機能）CORSの詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/HTTP/HTTP_access_control)と[こちら](https://qiita.com/tomoyukilabs/items/81698edd5812ff6acb34)をご覧ください。
  * https://min-api.cryptocompare.com/
    * こっちのAPIは”API Explorer”と言ってAPIの叩く方法を簡単に試せるようになっています
    * 必要なデータは：
      * 24時間中の1分に1点
        * 1440点
        * 24時間のデータはこの1440点から計算できる
        * BTC<>JPYを比べるデータ
  * https://coinmarketcap.com/api/
    * こっちのAPIはExplorerがないけど、リクエストの種類も少なくて単純なAPIです。
    * 必要なデータは
      * 24 Hour Volume（BTC<>JPY）
      * Market Cap（BTC<>JPY)
    * 注意：このAPIから必要なデータを取得する前にAPIに渡すBTCのIDを見つけないといけません。listingsエンドポイントからIDを取得しましょう

# Checkpoint-2

サーバ側のAPIサービスを実装します。

前回はAPIサービスなどはフロントサイドのモジュールを作成して関数を書きましたが、今回はExpressJSを利用してフロントが使うミニAPIを作ります。アーキテクチャーはこちらです：

クライアント（VueJS）→　サーバ（Express）→　第三者提供API

サーバ側でAPIサービスを作る理由：

* coinmarketcap.com/apiは叩くとCORSヘッダーを返してくれないのでhostnameが定義されていない環境からリクエストを送る必要があります。（ブラウザは必ずhostnameが定義されてる）
* 今回は第三者が提供している無料のAPIなのでAPI Keyは不要ですけど、API Keyが必要な時にクライアントからAPIを直接叩くとユーザーがブラウザのNetworkタブでAPI Keyが見えることになってしまいます。セキュリティーNGです。

**タスク：**

* ブラウザで使ってきたfetchのノード版(node-fetch)をインストールしよう
  * `npm install --save node-fetch`
* タイムデータの形式変換のためにmomentモジュールをインストールしよう
  * `npm install --save moment-timezone`
* 数値の形式変換のためにnumeralモジュールをインストールしよう
  * `npm install --save numeral`
* サーバ側のapi-service.jsのmin-api.cryptocompare APIを叩く関数 (getHistoricalData) を実装してみよう
  1. コンポーネントが必要なデータを考えて、HTTPレスポンス出力のデータ型を決めとこう
  1. Node-fetch を使用してAPIを叩いて、返されるデータの形式変換をしよう
  1. 必要だったらmoment-timezone, numeralモジュールを使用しよう
  1. 出力のデータ型に従ったものを関数から返そう（server/index.jsでレスポンスがクライアントに送られます）
  1. ブラウザかPOSTMANで正しいデータ型が返ってくるか試しとこう

# Checkpoint-3

Checkpoint-2と同じく、APIサービスの実装です。

**タスク：**

* api-service.js に coinmarketcap.com を叩く関数を実装しよう
  * 前回と同じくAPIから返されるデータの形式変換をしとこう
* ブラウザかPOSTMANで正しいデータ型が返ってくるか試しとこう

# Checkpoint-4

**タスク：**

* JEST をインストールしとこう
  * `npm install --save-dev jest`
  * `npm run test` でテストを実行するため、package.jsonのscriptsオブジェクトにコマンドを定義しとこう：
    * `"test": "jest"`
* api-service.js の隣に api-service.test.js というテストモジュールを作成しよう
* api-service の二つの関数をテストしておこう
  * 入力・出力をテストする感じでOK
* Appコンポーネント内でサーバAPI (`/api/market-information` & `/api/historical-data`) からデータを取得し、数字を表示するコンポーネント（６個のボックス）へデータを渡してみよう
  * ブラウザがアプリを実行する時、Nodeサーバを使用してAPIを叩こう。Appコンポーネントの `mounted` ライフサイクルフックを使おう

**リンク：**

* [Jest](https://jestjs.io/ja/)
* [VueJS Mounted ライフサイクルフック](https://jp.vuejs.org/v2/guide/instance.html#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)

# Checkpoint-5

最終チェックポイントはchart.jsの挑戦です！

**タスク：**

* Chartjsとvue-chartjsをインストールしよう
  * `npm install --save chart.js vue-chartjs`
* vue-chartjs コンポーネントのことを理解しておこう
  * https://vue-chartjs.org/#/ja/
  * ドキュメントをざっと読んで、必要そうな物を見つけよう
* チャート用のコンポーネントを実装しよう。わからないところがあったら気楽にメンターに質問してください！
  * まずはコンポーネントに渡すデータ型を理解しよう。試したり、ドキュメントを読んだり、挑戦してください
  * _実装テクニック_： 初めて使うライブラリーコンポーネントにはアプリのデータではなく、まずはテストデータを定義して渡してあげると色々試せて効率がいいかも。コンポーネントの動きを理解してから本番のデータを渡すのがいいかもしれないので、ぜひ試してみてください

**リンク：**

* [Vue ChartJS](https://vue-chartjs.org/#/ja/)

### **以上です。お疲れ様でした！**

***


# Starting the App

```bash
# install dependencies
npm install

# serve the client app with hot reload at localhost:8080
# also runs the API server at localhost:3000
npm start
```

Building the app for production:

```bash
# build for production with minification
npm run build
```
