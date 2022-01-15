import { ComponentType, useEffect } from 'react';

export const withMemberRequired = <T extends object>(
  WrappedComponent: ComponentType<T>,
) => {
  return function WithMemberRequired(props: T) {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = 'a';

    useEffect(() => {
      
    })

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };
};