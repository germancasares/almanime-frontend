import { act, render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import AnimeStatus from '../../../../enums/AnimeStatus';
import Season from '../../../../enums/Season';
import Info from './info';

describe('[Info]', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');

    act(() => {
      createRoot(div).render(
        <Info
          anime={{
            id: 'abcd',
            kitsuID: 1,
            slug: 'aaaa',
            name: 'AAAAAAAA',
            season: Season.Summer,
            status: AnimeStatus.Finished,
            synopsis: '',
            startDate: null,
          }}
          episodesCount={0}
        />,
      );
    });
  });

  test('renders episodes', () => {
    render(
      <Info
        anime={{
          id: 'abcd',
          kitsuID: 1,
          slug: 'aaaa',
          name: 'AAAAAAAA',
          season: Season.Summer,
          status: AnimeStatus.Finished,
          synopsis: '',
          startDate: null,
        }}
        episodesCount={1}
      />,
    );

    expect(screen.getAllByRole("listitem")[0].textContent).toBe("Episodes:1");
  });

  test.each(([
    [{ myAnimeListID: 1 }, 'https://myanimelist.net/anime/1'],
    [{ aniListID: 1 }, 'https://anilist.co/anime/1'],
    [{ aniDBID: 1 }, 'https://anidb.net/anime/1'],
  ]))('Anime with %p renders link for %p', (anime, result: string) => {
    const div = document.createElement('div');
    act(() => {
      createRoot(div).render(
        <Info
          anime={{
            id: 'abcd',
            kitsuID: 1,
            slug: 'aaaa',
            name: 'AAAAAAAA',
            season: Season.Summer,
            status: AnimeStatus.Finished,
            synopsis: '',
            startDate: null,
            ...anime,
          }}
          episodesCount={0}
        />,
      );
    });

    expect(div.querySelector(`a[href='${result}']`)).toBeTruthy();
  });
});
