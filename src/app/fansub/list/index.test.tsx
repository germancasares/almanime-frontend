import { render, screen } from 'test-utils';

import FansubApi from 'api/FansubApi';

import List from '.';

jest.mock('api/FansubApi');

describe('[Anime][List]', () => {
  let mockedGet: jest.Mock;

  beforeEach(() => {
    mockedGet = jest.fn();
    FansubApi.Get = mockedGet;
  });

  it('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    const { getByRole } = render(<List />);

    // Assert
    expect(getByRole('main')).toHaveClass('loader-wrapper');
  });

  it('should render empty main if no fansubs', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').id).toEqual('fansub-list');
    expect(screen.getByRole('heading').textContent).toEqual('Fansubs List');
    expect(screen.getAllByRole('rowgroup')[1].childNodes.length).toBe(0);
  });

  it('should render the fansubs if there are fansubs', () => {
    // Arrange
    mockedGet.mockReturnValue({
      isLoading: false,
      data: [{
        acronym: 'acronym',
        name: 'name',
        webpage: 'webpage',
        creationDate: 'creationDate',
        members: 'members',
      }],
    });

    // Act
    const { getByText } = render(<List />);

    // Assert
    expect(getByText('acronym')).toHaveAttribute('href', '/fansubs/acronym');
  });
});
