import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import List from '.';
import AnimeApi from '../../../api/AnimeApi';

vi.mock('api/AnimeApi');

describe('[Anime][List]', () => {
  let mockedGet: Mock;

  beforeEach(() => {
    mockedGet = vi.fn();
    AnimeApi.Get = mockedGet;
  });

  afterEach(() => {
    cleanup();
  })

  test('should render the loader if not fetched', async () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: true });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').className).toEqual('loader-wrapper');
  });

  test('should render empty main if no animes', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    cleanup

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').id).toEqual('anime-list');
    expect(screen.getByRole('heading').textContent).toEqual('Anime List');
    expect(screen.getAllByRole('rowgroup')[1].childNodes.length).toBe(0);
  });

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
        <List />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('name').getAttribute("href")).toBe('/animes/slug');
  });
});
