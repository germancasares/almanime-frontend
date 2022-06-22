export type SingleRoute = {
  path: string;
  component: (() => JSX.Element) | React.FC<object>;

  to: (...args: string[]) => string;
  hideHeader?: boolean;
  hideFooter?: boolean;
};

export type Routes = {
  [key: string]: SingleRoute;
};
