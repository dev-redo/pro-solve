type NavType = {
  [key: string]: string;
  MAIN: string;
  PROBLEM: string;
};

type ContentType = {
  children: React.ReactNode;
  isLoaded: boolean;
  isLoggedIn: boolean;
};

export { NavType, ContentType };
