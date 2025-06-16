# 🐾 MeowChat — The Cutest Cat Messenger on the Web

<p align="center">
  <a href="https://chat.epinetov.com/">
    <img src="https://img.shields.io/badge/live-demo-green?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/VsevolodEpinetov/meowchat">
    <img src="https://img.shields.io/github/last-commit/VsevolodEpinetov/cat-chat?style=for-the-badge" alt="Last Commit" />
  </a>
  <img src="https://img.shields.io/github/languages/top/VsevolodEpinetov/cat-chat?style=for-the-badge" alt="Top Language" />
  <img src="https://img.shields.io/badge/made%20with-love-%23ff69b4?style=for-the-badge" alt="Made with Love" />
</p>




A lightweight React + WebSocket project that lets you anonymously chat with cats. Your message gets automatically "translated" into cat language — for fun, relief, and fur therapy.

---

## ✨ Features

- 🎯 Real-time chat using `WebSocket`
- 🐱 Automatic translation to “cat language” (meow-ified messages)
- 🧠 Cute AI bots simulate playful conversation
- 🎨 Pastel UI with fun facts and playful animations
- 📊 Live user/bot count updates
- 🌐 International naming logic (e.g. *Sirfluff von Muffinwhiskers*)
- 💅 Responsive design & delightful UX touches
- 🔐 HTTPS + WSS, Nginx proxy + Let's Encrypt setup

---

## 📦 Tech Stack

| Frontend        | Backend        | DevOps            |
|----------------|----------------|-------------------|
| React           | Node.js (WS)   | Nginx (SSL Proxy) |
| TypeScript      | WebSocket      | Let's Encrypt     |
| CSS Modules    | Express-style  |  |

---

## 🚀 Local Development

### 1. Clone & Install

```bash
git clone https://github.com/VsevolodEpinetov/cat-chat.git
cd cat-chat
npm install
```

### 2. Start Frontend

```bash
npm run start
```

### 3. Start Secure WebSocket Server

```bash
cd server
node index.js
```

---

## 🐾 Production Notes

- Uses Certbot to manage SSL.
- Nginx reverse proxy handles routing `/ws` to backend.

---

🧩 Customization
- Add your own facts in FACTS[]
- Modify avatar assets in /public/avatars (Don't forget to change maxAvatarId in settings)

___

## 🤝 About Me

I'm a developer who loves blending **technical rigor** with **playful UX**.  
This project was a weekend experiment to:
- Practice full-stack deployment (WSS, Nginx, HTTPS)
- Explore WebSocket-based UX patterns
- Build something *silly but beautiful*

My contacts:

| Platform | Link |
|---------|------|
| Email | [vsevolod@epinetov.com](mailto:vsevolod@epinetov.com) |
| LinkedIn | [linkedin.com/in/vsevolod-epinetov](https://www.linkedin.com/in/vsevolod-epinetov/) |
| GitHub | [@VsevolodEpinetov](https://github.com/VsevolodEpinetov) |
| Telegram | [@send_dog_pics](https://t.me/send_dog_pics) |

---

> “Sometimes all you need is a cat that understands… even if it just says meow.”  
> — Anonymous Internet Human
