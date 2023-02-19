import { render } from 'test-utils';

import AnimeApi from 'api/AnimeApi';

import List from '.';

jest.mock('api/AnimeApi');

describe('[Anime][List]', () => {
  let mockedGet: jest.Mock;

  beforeEach(() => {
    mockedGet = jest.fn();
    AnimeApi.Get = mockedGet;
  });

  it('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    const { getByRole } = render(<List />);

    // Assert
    expect(getByRole('main')).toHaveClass('loader-wrapper');
  });

  it('should render empty main if no animes', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    // Act
    const { container } = render(<List />);

    // Assert
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should render the animes if there are animes', () => {
    // Arrange
    mockedGet.mockReturnValue({
      isLoading: false,
      data: [{
        slug: 'slug',
        name: 'name',
        season: 'season',
        status: 'status',
        episodes: 'episodes',
      }],
    });

    // Act
    const { getByText } = render(<List />);

    // Assert
    expect(getByText('name season status episodes')).toHaveAttribute('href', '/animes/slug');
  });
});
