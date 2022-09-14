interface LoginProps {
  isLoaded: boolean;
  userEmail: string;
  onLoginWithGoogle: () => void;
}

interface GoogleLoginProps {
  onLoginWithGoogle: () => void;
}

export { LoginProps, GoogleLoginProps };
