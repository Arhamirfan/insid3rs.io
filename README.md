# Getting Started with Create Next App

This project was bootstrapped with [Create Next App](https://nextjs.org/learn/basics/create-nextjs-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) or [0.0.0.0:3000](0.0.0.0:3000) to view it in the browser. or you can change the `PORT` from .env.local file.
The page will reload automatically if you make changes in code.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for **local** to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

When your build is ready, then you need to run your build and for this purpose you will run this command.

### `yarn build:dev`

Builds the app for **development** to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start:dev`

When your build is ready, then you need to run your build and for this purpose you will run this command.

### `yarn build:stage`

Builds the app for **stage** to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start:stage`

When your build is ready, then you need to run your build and for this purpose you will run this command.

### `yarn build:prod`

Builds the app for **prod** to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start:prod`

When your build is ready, then you need to run your build and for this purpose you will run this command.

### Code Splitting

Code is splitted into this pattern:
1- Pages -> calling the sections from `sections` folder
2- Sections -> setting up the structure of the page with responsiveness and call the components from `components` Folder
3- Components -> setting up the the full fledge component or using small shared components from `shared` folder

### Deployment

For deployment Next app on Vercel and other hostings: [https://nextjs.org/learn/basics/deploying-nextjs-app](https://nextjs.org/learn/basics/deploying-nextjs-app)
