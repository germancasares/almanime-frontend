import { useAuth0 } from '@auth0/auth0-react';
import { mdiFileUploadOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubtitleApi from '../../../../api/SubtitleApi';
import SubtitleLanguage from '../../../../enums/SubtitleLanguage';
import { SubtitleDTO } from '../../../../types/subtitle';
import './form.scss';

const Form = () => {
  const { fansubAcronym } = useParams<{ fansubAcronym: string }>();

  const [subtitle, setSubtitle] = useState({ fansubAcronym } as SubtitleDTO);
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { target: { name, value } } = event;
    setSubtitle((values) => ({ ...values, [name]: value === '' ? undefined : value }));
  };

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync, isLoading } = SubtitleApi.Post();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateAsync({
      subtitle,
      accessToken: await getAccessTokenSilently(),
    });
  };

  return (
    <form onSubmit={onSubmit} autoComplete="on">
      <div className="field">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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

      <div className="field">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="label" htmlFor="language">Language</label>
        <div className="control">
          <span className="select">
            <select onChange={onChange} name="language">
              {
                Object.keys(SubtitleLanguage).map((language) => (
                  <option>{language}</option>
                ))
              }
            </select>
          </span>
        </div>
      </div>

      <div className="field file is-primary has-name is-fullwidth">
        <label className="file-label" htmlFor="upload-subtitle">
          <input
            id="upload-subtitle"
            name="file"
            className="file-input"
            type="file"
            onChange={({ target: { files } }) => {
              if (!files) return;

              setSubtitle((values) => ({ ...values, file: files[0] }));
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
        <button type="submit" className={`button is-link${isLoading ? ' is-loading' : ''}`}>Submit</button>
      </div>
    </form>
  );
};

export default Form;
