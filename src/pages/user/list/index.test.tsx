import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import List from '.';
import UserApi from '../../../api/UserApi';

vi.mock('api/UserApi');

describe('[User][List]', () => {
  let mockedGet: Mock;

  beforeEach(() => {
    mockedGet = vi.fn();
    UserApi.Get = mockedGet;
  });

  afterEach(() => {
    cleanup();
  });

  test('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').className).toEqual('loader-wrapper');
  });

  test('should render empty main if no users', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').id).toEqual('user-list');
    expect(screen.getByRole('heading').textContent).toEqual('User List');
    expect(screen.getAllByRole('rowgroup')[1].childNodes.length).toBe(0);
  });

  test('should render the users if there are users', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [{ name: 'test', fansubs: [] }] });

    // Act
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('test').getAttribute("href")).toBe('/users/test');
  });
});
