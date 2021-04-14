type Props = {
  total: number;
  perPage: number;
  current: number;
  steps: number;
  onChange: (page: number) => void;
};

const Ellipsis = () => (
  <li>
    <span className="pagination-ellipsis">&hellip;</span>
  </li>
);

const Page = ({ page, onChange }: { page: number, onChange: (page: number) => void }) => (
  <li>
    <button
      type="button"
      className="pagination-link"
      aria-label={`Goto page ${page}`}
      value={page}
      onClick={(event) => onChange(parseInt((event.target as HTMLButtonElement).value, 10))}
    >
      {page}
    </button>
  </li>
);

const Pagination = ({
  total,
  perPage,
  current,
  steps,
  onChange,
}: Props): JSX.Element => {
  const totalPages = Math.ceil(total / perPage);

  const prePages = current - steps;
  const postPages = totalPages - current - steps + 1;

  return (
    <nav className="pagination is-right" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        {current > 1 && (<Page page={1} onChange={onChange} />)}

        {
          prePages > 0 && prePages <= steps && (
            Array.from(Array(prePages).keys()).map(
              (page) => <Page page={page + 2} onChange={onChange} key={page} />,
            )
          )
        }

        {prePages > steps && (<Ellipsis />)}

        {prePages > steps && current - 1 > 1 && (<Page page={current - 1} onChange={onChange} />)}

        <li>
          <button
            type="button"
            className="pagination-link is-current"
            aria-label={`Page ${current}`}
            aria-current="page"
          >
            {current}
          </button>
        </li>

        {postPages > steps && current + 1 < totalPages && (<Page page={current + 1} onChange={onChange} />)}

        {postPages > steps && (<Ellipsis />)}

        {
          postPages > 0 && postPages <= steps && (
            Array.from(Array(postPages).keys()).map(
              (page) => <Page page={page + current + 1} onChange={onChange} key={page} />,
            )
          )
        }

        {current < totalPages && (<Page page={totalPages} onChange={onChange} />)}
      </ul>
    </nav>
  );
};

export default Pagination;
