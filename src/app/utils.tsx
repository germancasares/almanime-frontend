import {
  ComponentType,
  FunctionComponent,
  useMemo,
  useState,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Loader from 'components/loader';

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
export const withAccessToken = <P extends object>(
  Component: ComponentType<P>,
  required?: boolean,
): FunctionComponent<P> => (props: P) => {
    const [accessToken, setToken] = useState<string>();
    const { getAccessTokenSilently } = useAuth0();
    useMemo(async () => {
      try {
        setToken(await getAccessTokenSilently());
      } catch (error) {
        console.debug(error);
      }
    }, [getAccessTokenSilently]);

    if (required && !accessToken) return (<Loader />);

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} accessToken={accessToken} />
    );
  };
