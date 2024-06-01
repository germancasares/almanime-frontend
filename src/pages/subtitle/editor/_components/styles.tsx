// Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
// Style: Default,Open Sans Semibold,45,&H00FFFFFF,&H000000FF,&H00020713,&H00000000,-1,0,0,0,100,100,0,0,1,1.7,0,2,10,10,15,1

const StyleEditor = () => (
  <div className="box">
    <form>
      <div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label" htmlFor="main-color">
              Main Color
            </label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  id="main-color"
                  className="input is-static"
                  type="email"
                  value="me@example.com"
                  readOnly
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

const Styles = ({
  isActive,
  setIsStylesActive,
}: {
  isActive: boolean;
  setIsStylesActive: (isActive: boolean) => void;
}) => (
  <div className={`modal${isActive ? " is-active" : ""}`}>
    <div
      role="presentation"
      className="modal-background"
      onClick={() => setIsStylesActive(false)}
    />
    <div className="modal-content">
      <StyleEditor />
    </div>
    <button
      type="button"
      className="modal-close is-large"
      aria-label="close"
      onClick={() => setIsStylesActive(false)}
    />
  </div>
);

export default Styles;
