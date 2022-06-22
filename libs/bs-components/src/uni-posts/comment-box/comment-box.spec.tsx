import { render } from '@testing-library/react';
import { CommentBox } from './comment-box';

import { setupDefaultStore, setupDefaultServer } from '@howto/test-utils';

const storeRef = setupDefaultStore();
const server = setupDefaultServer();

describe(`# ${CommentBox.name}`, () => {
  let store: typeof storeRef.store;
  let wrapper: typeof storeRef.wrapper;

  beforeEach(() => {
    ({store, wrapper} = storeRef);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<CommentBox item={{}} onDeleteItem={jest.fn} />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
