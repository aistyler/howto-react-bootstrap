import { render } from '@testing-library/react';

import BsComponents from './bs-components';

describe('BsComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BsComponents />);
    expect(baseElement).toBeTruthy();
  });
});
