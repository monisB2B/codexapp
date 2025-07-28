import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login page', () => {
  it('renders form', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(getByText('Login')).toBeTruthy();
  });
});
