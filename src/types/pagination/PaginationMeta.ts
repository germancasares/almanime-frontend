type PaginationMeta = {
  count: number;
  first: URL;
  previous: URL | null;
  next: URL | null;
  last: URL;
};

export default PaginationMeta;
