const createChromeTab = (url: string) =>
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabIndex = tabs[0]!.index;
    chrome.tabs.create({ url, index: tabIndex + 1 });
  });

export { createChromeTab };
