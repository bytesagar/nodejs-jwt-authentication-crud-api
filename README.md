## NodeJs CRUD REST API

---

> This is a simple API made in Nodejs with CRUD Operation for Tutorials, with JWT Authentication. Routes are protected by the authentication

### How To Setup

- `git clone https://github.com/sagar608/nodejs-crud-api.git`
- `cd nodejs-crud-api`
- `npm install`
- configure .env file
- `npm start` || `npm run dev`

> The project will start locally at localhost:3000

# API Endpoints

---

- POST /user/signup
- POST /user/login

- GET /tutorial/
- POST /tutorial/new
- GET /tutorial/{:id}
- POST /tutorial/edit/{:id}
- POST /tutorial/delete/{:id}
