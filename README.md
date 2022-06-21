# HowTo react bootstrap

## Initialization

```sh
yarn create nx-workspace howto-react-bootstrap \
  --appName=react-bs \
  --nxCloud=false \
  --packageManager=yarn \
  --preset=ts

# add plugins
yarn add -D @nrwl/react

# create react apps
nx generate @nrwl/react:application react-bootstrap --e2eTestRunner=none --style=css --no-interactive --dry-run
nx generate @nrwl/react:application bootstrap-theme --e2eTestRunner=none --style=css --no-interactive --dry-run

# create react libraries
nx generate @nrwl/react:library bs-theme --e2eTestRunner=none --style=css --no-interactive --dry-run
nx generate @nrwl/react:library bs-components --e2eTestRunner=none --style=css --no-interactive --dry-run
nx generate @nrwl/react:library rtk-rest-api --e2eTestRunner=none --style=css --no-interactive --dry-run

# install dependencies
yarn add bootstrap react-bootstrap

```
