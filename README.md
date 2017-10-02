# Github User Search

## Overview

This is a simple sample web application developed using React, Redux, and other related technologies.

**Demo**: https://d2mdm6y17sgau6.cloudfront.net/

The user interface of the application mainly composed with React container components lies in `containers` folder and presentational components from `components` folder. The application state is fully managed in the normalized redux store and asynchronous events are handled by the `redux-thunk` (for action creators logics) and `redux-saga`(for data fetching) middlewares. When connecting components to redux store, `reselect` has been used to efficiently compute derived data with memoization. For keeping CSS styles specific to the components in an organized way, the application is completely styled with `styled-components`.

## Getting started

This project was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app) and you can follow following steps to set up and build the project.

1. Clone the repo with `git clone https://github.com/tharakawj/github-user-search.git`
2. Run `npm install` in the root github-user-search folder
3. Now you can run the application in development mode with `npm start` command or build the app for production with `npm run build`

After building the app for the production, you can find static files to deploy in the `/build` folder.