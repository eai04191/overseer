<img align="right" src="https://www.dododex.com/media/creature/overseer.png" height="64px">

# Overseer

Discordでログインして、ARKのサーバーから自分をキックするやつ

# 動かす

1. forkしてvercelでホストする
2. envを埋める

# 開発

1. `.env.local.example`を`.env.local`にコピーして埋める
2. DiscordのアプリでRedirect先にローカルサーバーを許可する
    ```
    http://localhost:3000/api/auth/callback/discord
    ```
    ![](https://i.imgur.com/MxyW63O.png)
3. `yarn dev`で動く
