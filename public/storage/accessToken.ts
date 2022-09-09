chrome.storage.local.get(['accessToken'], response => {
  const initToken = response.accessToken;
  if (initToken) return;

  console.log(
    '[Pro Solve 익스텐션] :>> 프로그래머스에 저장된 귀하의 유저 정보를 이용해 토큰을 생성합니다.',
  );

  const allScript = Array.from(document.querySelectorAll('script'));
  const sentryScript = allScript.find(scriptElement =>
    scriptElement.innerHTML.includes('Sentry.init'),
  );

  const idRegex = /(?<=id:\s*)\w+(?=\,)/g;
  const usernameRegex = /(?<=username:\s)(\p{L}|\*|"|')+/gu;
  const emailRegex = /(?<=email:\s)(\p{L}|@|.)+/g;

  const userId = sentryScript.innerHTML.match(idRegex)[0];
  const userName = sentryScript.innerHTML.match(usernameRegex)[0];
  const userEmail = sentryScript.innerHTML.match(emailRegex)[0];

  const accessToken = `${userId}${userName}${userEmail}`;
  console.log(`[Pro Solve 익스텐션] :>> 귀하의 token은 ${accessToken}입니다.`);

  chrome.storage.local.set({ accessToken });
});

const getAccessToken = async () => {
  const { accessToken } = await chrome.storage.local.get(['accessToken']);
  return accessToken;
};

export { getAccessToken };
