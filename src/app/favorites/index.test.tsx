import { render } from 'test-utils';

import AnimeApi from 'api/AnimeApi';

import Favorites from '.';

jest.mock('api/AnimeApi');

describe('[Favorites]', () => {
  let mockedGet: jest.Mock;

  beforeEach(() => {
    mockedGet = jest.fn();
    AnimeApi.GetByBookmarked = mockedGet;
  });

  it('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    const { getByRole } = render(<Favorites />);

    // Assert
    expect(getByRole('main')).toHaveClass('loader-wrapper');
  });

  // it('should render empty main if no favorites', () => {
  //   // Arrange
  //   mockedGet.mockReturnValue({ isLoading: false, data: [] });

  //   // Act
  //   const { container } = render(<Favorites />);

  //   // Assert
  //   expect(container.firstChild).toBeEmptyDOMElement();
  // });

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
    const { getByText } = render(<Favorites />);

    // Assert
    expect(getByText('name season status episodes')).toHaveAttribute('href', '/animes/slug');
  });
});
