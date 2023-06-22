# Full-stack notebook

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### 1. Overview

Fullstack Notebook is a web application that allows users to __create__, __delete__, and __update__ notes. The application has a beautiful design and provides __elementary__ user registration. With Fullstack Notebook, users can easily keep track of their notes and access them from anywhere with an internet connection.

Fullstack Notebook is built using modern web technologies such as HTML, CSS, TypeScript, and Node.js. The frontend is built using __Next.js__, while the backend is built using __Python__ and __FastAPI__.

***

### 2. Installation

#### Clone the repo
```
    git clone https://github.com/D1scoB0y/fullstack_notebook.git
```
```
    cd "project_dir"
```

#### For server
1. Create a __`virtualenv`__ and activate it
```
    cd ./server
```
```
    python -m venv venv
```
```
    .\venv\Scripts\activate
```
2. Install __`requirements.txt`__
```
    pip install -r requirements.txt
```
3. Add __`.env`__ file and set these variables for yourself
```
    SECRET_KEY = your_secret_key
    DB_URL = your_database_url
```
4. Start __`FastAPI`__ app
```
    uvicorn src.main:app --reload
```

#### For client
1. Install __`package.json`__
```
    cd ./client
```
```
    npm install
```
2. Start __`Next.js`__ app and open __`http://localhost:3000`__ in your browser
```
    yarn dev
```

***

### 3. Usage

First you will see the landing page, you will be prompted to log in to your account or create a new one, after authorization you will be able to use all the functionality of this application.

Overall, Fullstack Notebook is a powerful and user-friendly application that makes note-taking a breeze. Whether you're a student, professional, or just someone who likes to stay organized, Fullstack Notebook is the perfect tool for you.
