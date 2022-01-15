import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import FansubApi from 'api/FansubApi';
import { Fansub } from 'types/fansub';

import './form.scss';

const Form = () => {
  const [fansub, setFansub] = useState({} as Fansub);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    setFansub(values => ({ ...values, [name]: value === '' ? undefined : value }));
  };

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync } = FansubApi.Post();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({
      fansub,
      token: await getAccessTokenSilently(),
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="name">Name</label>
        <div className="control">
          <input name="name" className="input" type="text" placeholder="Example no Fansub" onChange={onChange} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="acronym">Acronym</label>
        <div className="control">
          <input name="acronym" className="input" type="text" placeholder="EnF" onChange={onChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Webpage</label>
        <div className="control">
          <input name="webpage" className="input" type="url" placeholder="www.example.com" onChange={onChange}/>
        </div>
      </div>

      <div className="control">
        <button type="submit" className="button is-link">Submit</button>
      </div>
    </form>
  );
};

export default Form;

