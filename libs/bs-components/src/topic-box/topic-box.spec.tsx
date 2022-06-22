import { render } from '@testing-library/react';
import { TopicBox } from './topic-box';

import { setupDefaultStore, setupDefaultServer } from '@howto/test-utils';

const storeRef = setupDefaultStore();
const server = setupDefaultServer();

describe(`# ${TopicBox.name}`, () => {
  let store: typeof storeRef.store;
  let wrapper: typeof storeRef.wrapper;

  beforeEach(() => {
    ({store, wrapper} = storeRef);
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TopicBox item={{}} onClickMenuItem={jest.fn} />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
