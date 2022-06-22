import { render } from '@testing-library/react';
import { UniPostsComments } from './comment-list';

import { setupDefaultStore, setupDefaultServer } from '@howto/test-utils';

const storeRef = setupDefaultStore();
const server = setupDefaultServer();

describe(`# ${UniPostsComments.name}`, () => {
  let store: typeof storeRef.store;
  let wrapper: typeof storeRef.wrapper;

  beforeEach(() => {
    ({store, wrapper} = storeRef);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<UniPostsComments />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
