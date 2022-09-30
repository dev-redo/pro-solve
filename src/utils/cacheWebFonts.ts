import FontFaceObserver from 'fontfaceobserver';

const html = document.documentElement;
const cacheWebFonts = async (fonts: Array<string>) => {
  if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
    return;
  }

  const observer = fonts.map(font => {
    const obs = new FontFaceObserver(font);
    return obs.load();
  });

  document.documentElement.classList.add('blocking-time');
  setTimeout(() => {
    document.documentElement.classList.remove('blocking-time');
  }, 400);

  await Promise.all(observer)
    .then(fonts => {
      console.log('[Pro-Solve] 모든 폰트를 캐싱했습니다. :>>', fonts);
      document.documentElement.classList.add('fonts-loaded');
      sessionStorage.fontsLoaded = true;
    })
    .catch(error => {
      console.log('[Pro-Solve] 폰트를 캐싱하는데 실패했습니다 :>>', error.message);
    });
};

export { cacheWebFonts };
