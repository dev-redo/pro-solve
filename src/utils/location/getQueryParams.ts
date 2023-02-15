const getQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlParams.entries());
};

export { getQueryParams };
