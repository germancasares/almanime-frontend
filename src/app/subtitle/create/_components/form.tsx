import { ChangeEvent, FormEvent, useState } from 'react';
import { SubtitleDTO } from 'types/subtitle';
import { mdiFileUploadOutline } from '@mdi/js'; 
import Icon from '@mdi/react';
import SubtitleApi from 'api/SubtitleApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

const Form = () => {
  const { fansubAcronym } = useParams<{ fansubAcronym: string }>();

  const [subtitle, setSubtitle] = useState({
    fansubAcronym: fansubAcronym,
  } as SubtitleDTO);
  const { 
    getAccessTokenSilently,
  } = useAuth0();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;

    setSubtitle(values => ({ ...values, [name]: value === '' ? undefined : value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    await SubtitleApi.Post(subtitle, await getAccessTokenSilently());
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="animeSlug">Anime</label>
        <div className="control">
          <input 
            name="animeSlug" 
            className="input" 
            type="text"
            placeholder="shingeki-no-kyojin-the-final-season-part-2" 
            onChange={onChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="episodeNumber">Episode</label>
        <div className="control">
          <input 
            name="episodeNumber" 
            className="input" 
            type="number"
            placeholder="10" 
            onChange={onChange}
          />
        </div>
      </div>

      <div className="file is-primary has-name is-fullwidth">
        <label className="file-label">
          <input 
            name="file"
            className="file-input"
            type="file" 
            onChange={({ target: { files } }) => {
              if (!files) return;
 
              setSubtitle(values => ({ ...values, 'file': files[0] }));
            }} 
          />
          <span className="file-cta">
            <Icon className="file-icon" path={mdiFileUploadOutline} size={1} />
            <span className="file-label">
              Choose a file…
            </span>
          </span>
          <span className="file-name">
            {subtitle.file && subtitle.file.name}
          </span>
        </label>
      </div>

      <div className="control">
        <button type="submit" className="button is-link">Submit</button>
      </div>
    </form>
  );
};

export default Form;

