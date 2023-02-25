import React from 'react';

const useIsLoaded = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  return { isLoaded, setIsLoaded };
};

export { useIsLoaded };
