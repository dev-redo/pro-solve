type FetchParams = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

interface ErrorHandling {
  [status: number]: () => void;
}

interface RequestProps {
  url: string;
  fetchParams?: FetchParams;
  handleError?: ErrorHandling;
}

const defaultJSONHeaders = {
  Accept: 'application/json',
};

const defaultHTMLHeaders = {
  Accept: 'text/html',
};

const parseJson = <T>(response: Response): Promise<T> => response.json();
const parseHtml = (response: Response) => response.text();

const request = async (url: string, fetchParams: FetchParams): Promise<Response> => {
  const newFetchParams = {
    ...fetchParams,
    method: fetchParams?.method?.toUpperCase() ?? 'GET',
    headers: {
      ...(fetchParams?.headers ?? {}),
      ...defaultJSONHeaders,
    },
    body: fetchParams?.body ? JSON.stringify(fetchParams.body) : undefined,
  };

  const response = await fetch(url, newFetchParams);
  if (response.ok) {
    return Promise.resolve(response);
  }

  throw new Error();
};

const getJSON = async <T>({
  url,
  fetchParams = {},
  handleError = {},
}: RequestProps): Promise<T> => {
  return request(url, fetchParams)
    .then(parseJson)
    .catch(error => handleError[error.status]?.()) as Promise<T>;
};

const getHTML = async <T>({
  url,
  fetchParams = {},
  handleError = {},
}: RequestProps): Promise<T> => {
  const newFetchParams = {
    ...fetchParams,
    method: fetchParams?.method?.toUpperCase() ?? 'GET',
    headers: {
      ...(fetchParams?.headers ?? {}),
      ...defaultHTMLHeaders,
    },
    body: fetchParams?.body ? JSON.stringify(fetchParams.body) : undefined,
  };

  return request(url, newFetchParams)
    .then(parseHtml)
    .catch(error => handleError[error.status]?.()) as Promise<T>;
};

export { getJSON, getHTML };
