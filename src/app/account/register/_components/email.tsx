import { useCallback, useState } from 'react';
import { debounce } from 'debounce';
import AccountApi from 'api/AccountApi';
import { Success, Error } from 'components/help';
import { FieldProps } from './types';

type Props = FieldProps;

const Email = ({
  value,
  onChange,
}: Props): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [inFlight, setInFlight] = useState(true);

  const check = async (email: string) => {
    setIsAvailable(await AccountApi.IsEmailAvailable(email));
    setInFlight(false);
  };
  const checkDebounced = useCallback(debounce(check, 500), []);

  return (
    <label htmlFor="email" className="label">
      Email
      <input
        id="email"
        className="input"
        placeholder="luffy@onepiece.com"
        value={value}
        onChange={(event) => {
          setInFlight(true);
          onChange(event);
          checkDebounced(event.target.value);
        }}
      />
      { !inFlight
        && (isAvailable
          ? (<Success message="This email is available" />)
          : (<Error message="This email is not available" />))}
    </label>
  );
};

export default Email;
