
# Face Recogntion App 🧑✨




## 📖 Introduction
Welcome to FaceRecognition – the face recognition technology at your fingertips! Our app simplifies facial detection in images, allowing you to effortlessly box faces with precision. Perfect for photography enthusiasts and social media users alike with user-friendly design, making it easy for anyone to enhance their visual content. Experience the convenience of accurate face detection
## 🪶 Features

- 🔍**Advanced Face Detection:** Let FaceRecoginiton do the hard work for you as it accurately identifies and boxes faces within your images
- 📸**Upload and Analyze:** Simply upload your images, and watch as our app swiftly processes and displays the detected faces.
- 🌐**Versatile Compatibility:** Whether it's a group photo, a selfie, or a professional shot, it's caters to all image types.



## 🔖 Tech Stack

**Client:** React, Tachyons

**Server:** Node, Express, Clarifai, Postgresql


## ⚙️ Cloning locally

Clone the project

```bash
  git clone https://github.com/aman879/face-recognition.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```



## 🗝️ Configuration
Before you start using FaceRecognition app. You have to obtain you Clarifai API key and use it on App.js

    const PAT = //YOUR API KEY;
    
    const USER_ID = //USER_ID;       
    const APP_ID = //APP_NAME;
You can add this on your **Enviroment variable** also.

**For Backend:**

- Install postgresql and pgAdmin on you system.
- If using wsl visit file in backend folder and follow same steps
- Connect to pgAdmin and configure your server.js
    
      connection: {
        host : //your hostname,
        port : 5432,
        user : 'postgres',
        password : //password,
        database : //databaseName
      }
  
## 🧑‍💻 Running the app

Start postgresql

Go to backend folder

```bash
cd backend
```

Start the backend server

```bash
npm start
```

Go to your frontend folder

```bash
cd ..
cd frontend
```

Start frontend

```bash
npm run start
```

## 🤗 Contributing

We welcome all contributors to enhance Sentisonics and make it even more magical. If you have any suggestions, find bugs, or want to add exciting new features, feel free to submit a pull request or open an issue in the repository


## 🎗️ License

[MIT](https://github.com/aman879/face-recognition/blob/main/LICENSE)

