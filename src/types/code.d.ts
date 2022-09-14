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
  status: boolean;
}

interface SuccessResponse extends SolutionResponse {
  data: SolutionList;
}

interface FailedResponse extends SolutionResponse {
  message: string;
}

export { SuccessResponse, FailedResponse };
