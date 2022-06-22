import { render } from '@testing-library/react';
import { UniPostsList } from './list';

import { setupDefaultStore, setupDefaultServer } from '@howto/test-utils';

const storeRef = setupDefaultStore();
const server = setupDefaultServer();

describe(`# ${UniPostsList.name}`, () => {
  let store: typeof storeRef.store;
  let wrapper: typeof storeRef.wrapper;

  beforeEach(() => {
    ({store, wrapper} = storeRef);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<UniPostsList />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
