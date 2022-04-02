# HowTo react bootstrap

## [Create a JavaScript project using create-react-app](./cra-react-bootstrap/)

```sh
# create a react app
yarn create react-app ${APP-NAME}
cd ${APP-NAME}
# install dependency packages
yarn add react-bootstrap bootstrap 
# install additional packages
yarn add -D sass
```

update sass options. (See ./cra-react-bootstrap)

## [Create a TypeScript project using create-react-app](./cra-react-bootstrap-typescript/)

```sh
# create a react app
yarn create react-app ${APP-NAME} --template typescript
cd ${APP-NAME}
# install dependency packages
yarn add react-bootstrap bootstrap
yarn add -D typescript @types/node @types/react @types/react-dom @types/jest
# install additional packages
yarn add bootstrap-icons
yarn add -D sass
```
