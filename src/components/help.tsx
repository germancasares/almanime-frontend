import './help.scss';

type Props = {
  message: string,
};

export const Error = ({ message }: Props): JSX.Element => (
  <p className="help is-danger">
    {message}
  </p>
);

export const Success = ({ message }: Props): JSX.Element => (
  <p className="help is-success">
    {message}
  </p>
);
