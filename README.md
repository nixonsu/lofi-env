# Lofi-env

## About The Project

Lo-fi and pixel-art themed virtual study environment, equipped with an editable lofi radio, timer, to-do list and relaxing sound effects.

Users can create an account and login to save their settings.

Check out the web application at: [**https://www.lofi-env.com/**](https://www.lofi-env.com/)

<br>

<a href="https://github.com/ni-xon/lofi-env" target="_blank">
  <img src="images/lofi-env-login.png">
  <img src="images/lofi-env-white.png">
  <img src="images/lofi-env-dark.png">
  <img src="images/lofi-env-pink.png">
</a>

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

### Data Model
The data model implements a referenced model where related documents are linked to a user with userId.

![Alt text](/images/Data%20Model.svg)

## Testing & Deployment
Tests for backend APIs are written using the [Jest](https://jestjs.io/) library and automated as part of the build step of the CI/CD pipeline.

The web application is automatically deployed to [Heroku](https://dashboard.heroku.com/) as part of the deploy step of the CI/CD pipeline.

