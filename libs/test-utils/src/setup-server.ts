import { setupServer } from 'msw/node';
import {
  mswDefaultSuccessHandlers,
  mswDefaultPassthroughHandlers,
} from './msw-handlers';

export const setupDefaultServer = (passthrough = false) => {
  const server = setupServer(
    ...(passthrough ? mswDefaultPassthroughHandlers : mswDefaultSuccessHandlers)
  );

  beforeAll(() =>
    server.listen(passthrough ? {} : { onUnhandledRequest: 'error' })
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  return server;
};
