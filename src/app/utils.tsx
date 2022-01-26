import { ComponentType, FunctionComponent, useEffect, useMemo, useState } from 'react';
import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';

export const withMemberRequired = <T extends object>(
  WrappedComponent: ComponentType<T>,
) => {
  return function WithMemberRequired(props: T) {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = 'a';

    useEffect(() => {
      
    });

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };
};

export const withToken = <P extends object>(
  Component: ComponentType<P>,
  options?: GetTokenSilentlyOptions,
): FunctionComponent<P> => (props: P) => {
    const [token, setToken] = useState<string>();
    const { getAccessTokenSilently } = useAuth0();
    useMemo(async () => setToken(await getAccessTokenSilently(options)), [getAccessTokenSilently]);

    return (
      <Component {...props} token={token} />
    );
  };
