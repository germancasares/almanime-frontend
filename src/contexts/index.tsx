import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

const ConfigurationWrapper = ({ children }: Props): JSX.Element => (
  <>
    {children}
  </>
);

export default ConfigurationWrapper;
