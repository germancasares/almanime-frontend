import PaginationMeta from './PaginationMeta';

type ModelWithMeta<T> = {
  meta: PaginationMeta;
  models: T;
};

export default ModelWithMeta;
