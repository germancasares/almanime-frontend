type PaginationMeta = {
  count: number;
  first: URL;
  previous: URL | undefined;
  next: URL | undefined;
  last: URL;
};

export default PaginationMeta;
