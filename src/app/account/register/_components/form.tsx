import { ChangeEvent, FormEvent, useState } from 'react';
import Username from './username';
import Email from './email';
import Password from './password';
import ConfirmPassword from './confirmPassword';
import './form.scss';

const Form = (): JSX.Element => {
  // const [conPassFocus, setConPassFocus] = useState(false);
  // const emailState = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(form);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  return (
    <form id="form" className="box" onSubmit={onSubmit} autoComplete="off">
      <Username value={form.username} onChange={onChange} />
      <Email value={form.email} onChange={onChange} />
      <hr />
      <Password value={form.password} onChange={onChange} />
      <ConfirmPassword value={form.confirmPassword} password={form.password} onChange={onChange} />
      {/* {
        conPassFocus && form.password !== form['confirm-password'] && (
          <p className="help is-danger">
            The password does not match
          </p>
        )
      } */}
      <hr />
      <button type="button" className="button is-default">Cancel</button>
      <button type="submit" className="button is-pulled-right">Create</button>
    </form>
  );
};

export default Form;
