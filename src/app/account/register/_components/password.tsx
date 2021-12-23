import { FieldProps } from './types';

type Props = FieldProps;

const Password = ({
  value,
  onChange,
}: Props): JSX.Element => (
  <label htmlFor="password" className="label">
    Password
    <input
      id="password"
      type="password"
      placeholder="●●●●●●●"
      className="input"
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Password;
