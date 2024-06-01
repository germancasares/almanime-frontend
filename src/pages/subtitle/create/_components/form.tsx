import { ChangeEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubtitleDTO } from "../../../../types/subtitle";
import routes from "../../../routes";
import "./form.scss";

const Form = () => {
  const { fansubAcronym } = useParams<{ fansubAcronym: string }>();

  const [subtitle, setSubtitle] = useState({
    fansubAcronym,
    animeSlug: "",
    episodeNumber: 0,
  } as SubtitleDTO);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setSubtitle((values) => ({
      ...values,
      [name]: value === "" ? undefined : value,
    }));
  };

  return (
    <form autoComplete="on">
      <div className="field">
        <label className="label" htmlFor="animeSlug">
          Anime
        </label>
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
        <label className="label" htmlFor="episodeNumber">
          Episode
        </label>
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

      <div className="control">
        <Link
          className="button is-link"
          to={routes.subtitle.editor.to(
            subtitle.fansubAcronym,
            subtitle.animeSlug,
            subtitle.episodeNumber.toString(),
          )}
        >
          <span>Editor</span>
        </Link>
      </div>
    </form>
  );
};

export default Form;
