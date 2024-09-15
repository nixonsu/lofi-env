# Lofi-env

## About The Project

Lo-fi and pixel-art themed virtual study environment, equipped with an editable lofi radio, timer, to-do list and relaxing sound effects. This project was essentially born out of my desire for an all-in-one space for all my study needs throughout university 🎓

Check out the web application at: https://lofi-env.fly.dev/

<br>

![register](https://user-images.githubusercontent.com/57848315/177245668-6e97a562-cce1-435b-91cb-2e9deb8a0d5b.gif)
<p align = "center">
<i>User registeration and changing background colour</i>
</p>

<br>

![app_features](https://user-images.githubusercontent.com/57848315/177245674-e939ca06-0755-40a9-85e8-b89c75efd833.gif)
<p align = "center">
<i>Main features showcase</i>
</p>

## Features

- User authorisation & authentication
- Simple timer
- Customisable playlist that allows users to paste in their own youtube links to listen to
- Controllable radio that plays directly from the playlist
- To-do list that allows users to input tasks and mark tasks as done
- Customisable background color via an interactive color picker
- Adjustable sound effects that allows users to craft their own ambient sounds
- CRUD operations on all features

## Technologies

**Frontend:**

- TypeScript
- React.js
- Redux Toolkit
- Styled Components (CSS-in-JS)

**Backend:**

- TypeScript
- Node.js
- Express.js
- MongoDB

## Design and Architecture

### Architecture
The project implements the MERN (MongoDB, Express, React, Node.JS) stack.

![image](https://user-images.githubusercontent.com/57848315/177243647-85737f56-d0b9-46bc-abe2-28073cc2b943.png)


### Data Model
The data model implements a referenced model where related documents are linked to a user with userId.

![Alt text](/docs/images/Data%20Model.svg)

## Testing & Deployment
Tests for backend APIs are written using the [Jest](https://jestjs.io/) library and automated as part of the build step of the CI/CD pipeline.

The web application is automatically deployed with [Fly.io](https://fly.io/) as part of the deploy step of the CI/CD pipeline.


## Usage
### Run it locally
1. Clone the repo
2. Add `.env` file with following contents to `./backend`

```zsh
ENV=dev
JWT_SECRET=anyStringYouWouldLike
DB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

*[MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) allows you to host a couple of free databases; pretty neat. You can deploy your own and grab the `DB_URI` from there.*

3. Navigate to root directory and run with your desired package manager:
```zsh
yarn start          # with yarn
```
4. All dependencies will be installed and web application will be accessible on http://localhost:3000

**NOTE:** When application is started locally, requests made from the frontend are proxied to port 4000 (default port for the backend). Proxy is specified in `./frontend/package.json`.


### Troubleshooting
**Bug:** If the frontend just shows a blank screen, it's most likely a local storage issue. This is a known bug, but you can fix this by clearing `users` entry from local storage.