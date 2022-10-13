import fetch, { Headers, BodyInit } from 'node-fetch';

type reqConfigType = {
  url: string;
  method?: string;
  headers?: Headers;
  body?: BodyInit | undefined;
};

const fetchRequest = async (reqConfig: reqConfigType) => {
  const { url, method, headers, body } = reqConfig;

  try {
    const res = await fetch(url, {
      method: method || 'GET',
      headers: headers || {},
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error('[Pro-Solve] 데이터 fetch하는데 실패했습니다.');
    }

    const payload = await res.json();
    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export { fetchRequest };
