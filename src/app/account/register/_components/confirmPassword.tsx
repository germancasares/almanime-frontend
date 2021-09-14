import { useState } from 'react';
import { Error } from 'components/help';
import { FieldProps } from './types';

type Props = FieldProps & {
  password: string,
};

const ConfirmPassword = ({
  value,
  onChange,
  password,
}: Props): JSX.Element => {
  const [isDifferent, setIsDifferent] = useState(false);

  return (
    <label htmlFor="confirmPassword" className="label">
      Confirm password
      <input
        id="confirmPassword"
        type="password"
        placeholder="●●●●●●●"
        className="input"
        value={value}
        onChange={(event) => {
          onChange(event);
          setIsDifferent(password !== event.target.value);
        }}
      />
      { isDifferent && <Error message="The passwords do not match" />}
    </label>
  );
};

export default ConfirmPassword;
