# HowTo react bootstrap

## Initialization

```sh
yarn create nx-workspace howto-react-bootstrap \
  nxCloud=false \
  packageManager=yarn \
  preset=ts

# add plugins
yarn add -D @nrwl/react

# create react apps
nx generate @nrwl/react:application react-bootstrap --e2eTestRunner=none --style=css --no-interactive --dry-run
nx generate @nrwl/react:application bootstrap-theme --e2eTestRunner=none --style=css --no-interactive --dry-run

# install dependencies
yarn add bootstrap react-bootstrap

```
