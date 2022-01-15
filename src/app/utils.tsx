import { useAuth0 } from '@auth0/auth0-react';
import { ComponentType, FunctionComponent, useMemo, useState } from 'react';

export const withToken = <P extends object>(
  Component: ComponentType<P>,
): FunctionComponent<P> => (props: P) => {
    const [token, setToken] = useState<string>();
    const { getAccessTokenSilently } = useAuth0();
    useMemo(async () => setToken(await getAccessTokenSilently()), [getAccessTokenSilently]);

    return (
      <Component {...props} token={token} />
    );
  };