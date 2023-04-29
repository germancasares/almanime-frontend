import { render, screen } from 'test-utils';

import UserApi from 'api/UserApi';

import List from '.';

jest.mock('api/UserApi');

describe('[User][List]', () => {
  let mockedGet: jest.Mock;

  beforeEach(() => {
    mockedGet = jest.fn();
    UserApi.Get = mockedGet;
  });

  it('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    const { getByRole } = render(<List />);

    // Assert
    expect(getByRole('main')).toHaveClass('loader-wrapper');
  });

  it('should render empty main if no users', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').id).toEqual('user-list');
    expect(screen.getByRole('heading').textContent).toEqual('User List');
    expect(screen.getAllByRole('rowgroup')[1].childNodes.length).toBe(0);
  });

  it('should render the users if there are users', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [{ name: 'test', fansubs: [] }] });

    // Act
    const { getByText } = render(<List />);

    // Assert
    expect(getByText('test')).toHaveAttribute('href', '/users/test');
  });
});
