# deep-neuron-lab

## **Notes**

1. Task is completed with React.JS
2. I've used context API to share actions and state between components
3. React-query is used for fetching
4. ErrorBoundary used for catching unexpected errors
5. Newly added todo has 'isLocal' key which indicates that todo is for local use only. And any further action will be executed directly in front-end store (without using APIs as they are returning 404 error)
6. No special styling tools/packages used. So its simple CSS.
7. `7. State: Implement a mechanism so that the user can preserve the state when reloading` I haven't implemented this point as it's not clear to me. If it's important then explain use cases please and I'll take care!
8. Took checkbox styles from codepen and modified it a bit :)

## **Steps to run**

1. First of all -> rename file `.env.example` to `.env`
2. Install packages -> `yarn install`
3. Finally run and enjoy! -> `yarn start`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).