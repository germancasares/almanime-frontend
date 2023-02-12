import {
  ComponentType,
  FunctionComponent,
  useMemo,
  useState,
} from 'react';
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

// eslint-disable-next-line import/prefer-default-export
export const withToken = <P extends object>(
  Component: ComponentType<P>,
): FunctionComponent<P> => (props: P) => {
    const [token, setToken] = useState<string>();
    const { getAccessTokenSilently } = useAuth0();
    useMemo(async () => {
      try {
        setToken(await getAccessTokenSilently());
      } catch (error) {
        console.debug(error);
      }
    }, [getAccessTokenSilently]);

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} token={token} />
    );
  };
