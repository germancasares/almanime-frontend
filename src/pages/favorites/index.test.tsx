import { render, screen } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import Favorites from '.';
import AnimeApi from '../../api/AnimeApi';
import { BrowserRouter } from 'react-router-dom';

vi.mock('api/AnimeApi');

describe('[Favorites]', () => {
  let mockedGet: Mock;

  beforeEach(() => {
    mockedGet = vi.fn();
    AnimeApi.GetByBookmarked = mockedGet;
  });

  test('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByRole('main').className).toEqual('loader-wrapper');
  });

  // test.skip('should render empty main if no favorites', () => {
  //   // Arrange
  //   mockedGet.mockReturnValue({ isLoading: false, data: [] });

  //   // Act
  //   const { container } = render(<Favorites />);

  //   // Assert
  //   expect(container.firstChild).toBeEmptyDOMElement();
  // });

  test('should render the animes if there are animes', () => {
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
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('name season status episodes').getAttribute("href")).toBe('/animes/slug');
  });
});
