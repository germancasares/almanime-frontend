import { useCallback, useState } from 'react';
import { debounce } from 'debounce';
import AccountApi from 'api/AccountApi';
import { Success, Error } from 'components/help';
import { FieldProps } from './types';

type Props = FieldProps;

const Username = ({
  value,
  onChange,
}: Props): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [inFlight, setInFlight] = useState(true);

  const check = async (username: string) => {
    setIsAvailable(await AccountApi.IsUsernameAvailable(username));
    setInFlight(false);
  };
  // const checkDebounced = useCallback(debounce(check, 500), []);

  return (
    <label htmlFor="username" className="label">
      Username
      <input
        id="username"
        type="text"
        className="input"
        placeholder="Luffy"
        value={value}
        onChange={(event) => {
          setInFlight(true);
          onChange(event);

          useCallback(debounce(check, 500), []);

          // checkDebounced(event.target.value);
        }}
      />
      { !inFlight
        && (isAvailable
          ? (<Success message="This username is available" />)
          : (<Error message="This username is not available" />))}
    </label>
  );
};

export default Username;
