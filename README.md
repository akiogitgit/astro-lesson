# Astro Starter Kit: Basics

```
npm create astro@latest -- --template basics
```

## Astro 概要

デフォルトで SG、JavaScript を出来るだけ取り除いて爆速になる、MPA

- コンポーネントアイランド： 高速なウェブサイトを構築するための新しいウェブアーキテクチャー。
- サーバーファーストの API 設計： ユーザーのデバイスから高コストのハイドレーションをなくします。
- デフォルトでゼロ JS： サイトを遅くする JavaScript ランタイムオーバーヘッドはありません。
- エッジ対応： Deno や Cloudflare のようなグローバルなエッジを含め、どこでもデプロイできます。
- カスタマイズ可能： Tailwind、MDX、その他 100 以上のインテグレーションから選択可能です。
- 特定の UI に依存しない： React、Preact、Svelte、Vue、Solid、Lit などをサポートします。

## Astro を使う理由

- コンテンツ重視
  - 近年のフロントエンドのフレームワークが Figma のような操作性重視の Web アプリケーションにフォーカスしているのに対し、Astro はコンテンツが豊富なサイト向けに設計されている
- サーバーファースト
  - サーバーサイドレンダリングを最大限活用する。Next.js や Nuxt の SSR がパフォーマンス懸念への対処として限定的に使用されるのと対照的
- デフォルトで高速
  - ロードが遅くなる原因となる JavaScript をクライアントで起動しない(アイランドを除く)
- 簡単に使える
  - React、Svelte、Vue などの UI コンポーネント言語が使え、独自の Astro UI 言語も用意されている
- 充実した機能と柔軟性
  - オールインワンであり、多くのインテグレーションにより拡張可能

## SG

### ダイナミックルーティング

getStaticPaths が必要になる
pages/posts/[id].astro

```js
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts: Post[] = await res.json()

  return posts.map(post => {
    return {
      params: {
        id: post.id,
      },
      props: { post },
    }
  })
}
```

ページネーション
Astro はページネーション機能が備わっていて、簡単に実装することができる

ページネーションの設定

```js
export async function getStaticPaths({ paginate }: GetStaticPathsOptions) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts: Post[] = await res.json()
  return paginate(posts, { pageSize: 5 })
}

// Propsで、pageデータを取得
const { page } = Astro.props

// page.dataにデータ(post)が配列で入る
// 他の要素
// page.start, end, total, currentPage, size, lastPage
```

## SSR

Astro での SSR はページ単位でのみ利用できる

SSR を使うには、サーバーランタイムが必要

```
pnpm astro add node
```

プロジェクトで SSR を有効にする。

```js
export default defineConfig({
  server: {
    port: 3000,
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
```

### SSR のダイナミックルーティング

（なんか不安定な気がする）

SSR では、getStaticPaths を使わないため、そのコードを削除する
代わりに、毎回 URL パラメータの[id]を使い、1 つだけデータを取得する

## 他のライブラリ・フレームワーク導入

使えるのはコンポーネントのみ
pages 直下は、.astro のみ使える

### React 導入

```
pnpm astro add react
```

```js
import react from '@astrojs/react'
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [react()], // react導入
})
```

component 作成

```js
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>UP</button>
      <button onClick={() => setCount(count - 1)}>Down</button>
    </div>
  )
}
```

astro ファイルで使う

```js
~省略~
<Counter/> // counterが発動しない

// 効く
<Counter client:load /> // ページ読み込み時にJSがインポート
<Counter client:visible /> // スクロールされて見えた時にJSがインポート

```

### Vue 導入

```
pnpm astro add vue
```

### Svelte 導入

```
pnpm astro add svelte
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
