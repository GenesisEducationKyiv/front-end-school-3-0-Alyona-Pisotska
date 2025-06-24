import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  const onChangeMock = vi.fn();
  const user = userEvent.setup();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders with custom placeholder and initial value', () => {
    render(<SearchInput searchText='Hello' onChangeSearchText={onChangeMock} placeholder='Custom placeholder' />);

    const input = screen.getByTestId('search-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Hello');
  });

  test('correctly updates searchText and calls onChangeSearchText when used as a controlled component', async () => {
    function Wrapper() {
      const [searchText, setSearchText] = useState('');
      const handleChange = (val: string) => {
        onChangeMock(val);
        setSearchText(val);
      };

      return <SearchInput searchText={searchText} onChangeSearchText={handleChange} />;
    }

    render(<Wrapper />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'New search');

    expect(onChangeMock).toHaveBeenLastCalledWith('New search');
    expect(input).toHaveValue('New search');
  });

  test('shows a clear button when there is text and clears input on click', async () => {
    render(<SearchInput searchText='some text' onChangeSearchText={onChangeMock} />);

    const clearButton = screen.getByTestId('clear-search-button');
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    expect(onChangeMock).toHaveBeenCalledWith('');
  });

  test('does not show a clear button when the input is empty', () => {
    render(<SearchInput searchText='' onChangeSearchText={onChangeMock} />);

    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });
});
