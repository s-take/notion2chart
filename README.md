## 使い方

- NotionのAPI用ユーザーを作ってAPI Keyを発行する
  - ここら辺参考
  - https://zenn.dev/5t111111/articles/785fec8d21d82b


- .envファイルを作って以下の設定をする。DatabaseIDはURLからわかる。

```
NOTION_SECRET=secret_xxxx
NOTION_DATABASE_ID=xxxx
```

- 以下のコマンドで起動する

```
$ npm install
$ npm run dev
```

## 現状の仕様

### データベースのカラム

- 変えたいときは lib/notion.tsを修正する

- 必須項目
  - Title(タイトル)
  - Status(セレクト Done,Doing,Todo)
  - Category(マルチセレクト)
  - Category2(マルチセレクト)
  - Sprint(文字列)
  - StoryPoint(数値)
  
- 空のバックログがあるとエラーになる

### ダッシュボード

- 以下のコンポーネントから構成される
  - 前回のベロシティ(VelocityText.tsx)
  - ベロシティの推移(VelocityChanges.tsx)
  - Categoryの分類(CategoryChart.tsx)
  - Category2の分類(Category2Chart.tsx)

- 変えたいときは pages/dashboard.tsx と そこから呼ばれる components 配下のファイルを修正する

- dashboard.tsxでデータ取得するときにステータスDoneでフィルターとかしてるので変えたいならそこを修正する