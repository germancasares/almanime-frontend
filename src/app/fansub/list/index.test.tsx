import { render } from 'test-utils';

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
    const { container } = render(<List />);

    // Assert
    expect(container.firstChild).toBeEmptyDOMElement();
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
    expect(getByText('acronym name webpage creationDate members')).toHaveAttribute('href', '/fansubs/acronym');
  });
});
