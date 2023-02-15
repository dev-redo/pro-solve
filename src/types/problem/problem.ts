type SelectedLanguage =
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'java'
  | 'javascript'
  | 'kotlin'
  | 'python'
  | 'python3'
  | 'ruby'
  | 'scala'
  | 'swift'
  | 'mysql'
  | 'oracle';

interface ProblemInfo {
  selectedLanguage: SelectedLanguage;
  problemId: string;
}

export { SelectedLanguage, ProblemInfo };
