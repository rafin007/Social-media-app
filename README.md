# Social media app
*A Social Media app made with MERN stack*

**Features:**
* Dark mode
* Password recovery via email
* Create posts as pictures or statuses
* Like or comment on pictures
* Follow, unfollow users
* Make account private
* Other CRUD operations

**Technologies used:**
* MongoDB Atlast
* React.js
* Express
* Node
* Redux

***

**To run in your local environment:**
1. From the root directory run `npm install` to install dependencies for server
2. `cd client` to go to the client directory and run `npm install` to install dependencies for client
3. From the root directory type `mkdir config` to create a new folder and inside the folder create a file `default.json`
4. Into the json file, paste the following key-value pairs and change those values accordingly:
```javascript
{
  "mongoURI": "Your mongodb url",
  "jwtSecret": "a secret to hash password",
  "email": "an email to send mail from",
  "pass": "password of that email",
  "frontendURL": "http://localhost:3000"
}
```
5. From the root directory, run `npm run dev` to start the development server
