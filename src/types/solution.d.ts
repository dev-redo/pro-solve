interface Solution {
  code: string;
  failedTestCase: number;
  passedTestCase: number;
  isSuccess: boolean;
  selectedLanguage: string;
  uploadTime: {
    nanoseconds: number;
    seconds: number;
  };
}

type SolutionList = Solution[];

interface SolutionResponse {
  status?: boolean;
  data?: SolutionList;
  message?: string;
}

export { SolutionResponse };
