import React from 'react';

const useIsLoaded = () => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  return { isLoaded, setIsLoaded };
};

export { useIsLoaded };
