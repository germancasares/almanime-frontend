import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import List from '.';
import FansubApi from '../../../api/FansubApi';

vi.mock('api/FansubApi');

describe('[Anime][List]', () => {
  let mockedGet: Mock;

  beforeEach(() => {
    mockedGet = vi.fn();
    FansubApi.Get = mockedGet;
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

  test('should render empty main if no fansubs', () => {
    // Arrange
    mockedGet.mockReturnValue({ isLoading: false, data: [] });

    // Act
    render(<List />);

    // Assert
    expect(screen.getByRole('main').id).toEqual('fansub-list');
    expect(screen.getByRole('heading').textContent).toEqual('Fansubs List');
    expect(screen.getAllByRole('rowgroup')[1].childNodes.length).toBe(0);
  });

  test('should render the fansubs if there are fansubs', () => {
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
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('acronym').getAttribute("href")).toBe('/fansubs/acronym');
  });
});
