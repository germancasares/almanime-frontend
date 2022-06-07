import { ComponentType, FunctionComponent, useMemo, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// export const withMemberRequired = <T extends object>(
//   WrappedComponent: ComponentType<T>,
// ) => {
//   return function WithMemberRequired(props: T) {
//     // Fetch the props you want to inject. This could be done with context instead.
//     const themeProps = 'a';

//     useEffect(() => {
      
//     });

//     // props comes afterwards so the can override the default ones.
//     return <WrappedComponent {...themeProps} {...(props as T)} />;
//   };
// };

export const withToken = <P extends object>(
  Component: ComponentType<P>,
): FunctionComponent<P> => (props: P) => {
    const [token, setToken] = useState<string>();
    const { getAccessTokenSilently } = useAuth0();
    useMemo(async () => {
      try {
        return setToken(await getAccessTokenSilently());
      } catch (error) {}
    }, [getAccessTokenSilently]);

    return (
      <Component {...props} token={token} />
    );
  };
