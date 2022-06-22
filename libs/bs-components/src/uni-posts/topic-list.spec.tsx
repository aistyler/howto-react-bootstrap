import { render } from '@testing-library/react';
import { UniPostsTopics } from './topic-list';

import { setupDefaultStore, setupDefaultServer } from '@howto/test-utils';

const storeRef = setupDefaultStore();
const server = setupDefaultServer();

describe(`# ${UniPostsTopics.name}`, () => {
  let store: typeof storeRef.store;
  let wrapper: typeof storeRef.wrapper;

  beforeEach(() => {
    ({store, wrapper} = storeRef);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<UniPostsTopics />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
