type Message = {
  request: any;
  sender: chrome.runtime.MessageSender;
  sendResponse: (response?: unknown) => void;
};

type Children = {
  children: JSX.Element | JSX.Element[];
};

export { Message, Children };
