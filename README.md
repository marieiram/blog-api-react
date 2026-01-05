- blog-mvcリポジトリをベースとして **Rails API + React** 版を別リポジトリで作成予定
- 見た目（UI/UX）の改善
- API設計・フロントエンド分離の学習

## API エンドポイント（最小構成）

### 認証（Auth）

| Method | Endpoint | Description |
|------|----------|------------|
| POST | /api/login | ログイン |
| DELETE | /api/logout | ログアウト |
| GET | /api/me | ログイン中ユーザー取得 |

---

### 投稿（Posts）

| Method | Endpoint | Description |
|------|----------|------------|
| GET | /api/posts | 投稿一覧取得 |
| GET | /api/posts/:id | 投稿詳細取得 |
| POST | /api/posts | 投稿作成 |
| PATCH | /api/posts/:id | 投稿更新 |
| DELETE | /api/posts/:id | 投稿削除 |

---

### コメント（Comments）

| Method | Endpoint | Description |
|------|----------|------------|
| GET | /api/posts/:post_id/comments | コメント取得 |
| POST | /api/posts/:post_id/comments | コメント作成 |
| DELETE | /api/comments/:id | コメント削除 |
