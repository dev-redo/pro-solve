const solutionList = [
  {
    selectedLanguage: 'javascript',
    uploadTime: {
      seconds: 1677320311,
      nanoseconds: 996000000,
    },
    isSuccess: true,
    code: 'function solution(babbling) {\n  var answer = 0;\n  const regex = /^(aya|ye|woo|ma)+$/;\n\n  babbling.forEach(word => {\n    if (regex.test(word)) answer++;  \n  })\n\n  return answer;\n}\n',
    passedTestCase: 17,
    failedTestCase: 0,
  },
  {
    passedTestCase: 12,
    code: 'const WORDS = ["aya", "ye", "woo", "ma"];\n\nfunction solution(babbling) {\n    let answer = 0;\n    for (let word of babbling) {        \n        for (let idx=0; idx<WORDS.length; idx++) {\n            word = word.replaceAll(WORDS[idx], "O");\n        }\n        \n        const wordBabble = [...word.split(\'\')\n                .reduce((set, elem) => {\n                    set.add(elem);\n                    return set;\n                }, new Set())];\n        const isWordBabble = wordBabble.length === 1 && wordBabble[0] === \'O\';\n        \n        if (isWordBabble) { answer += 1; }\n    }\n    \n    return answer;\n}\n\n// "aya", "ye", "woo", "ma" 만 발음 가능\n// return input으로 주어지는 babbling에서 발음 가능한 단어의 개수\n\n// Algorithm Flow\n// ',
    isSuccess: true,
    failedTestCase: 0,
    uploadTime: {
      seconds: 1673518579,
      nanoseconds: 595000000,
    },
    selectedLanguage: 'javascript',
  },
  {
    isSuccess: true,
    code: 'const WORDS = ["aya", "ye", "woo", "ma"];\n\nfunction solution(babbling) {\n    let answer = 0;\n    for (let word of babbling) {        \n        for (let idx=0; idx<WORDS.length; idx++) {\n            word = word.replaceAll(WORDS[idx], "O");\n        }\n        \n        const wordBabble = [...word.split(\'\')\n                .reduce((set, elem) => {\n                    set.add(elem);\n                    return set;\n                }, new Set())];\n        const isWordBabble = wordBabble.length === 1 && wordBabble[0] === \'O\';\n        \n        if (isWordBabble) { answer += 1; }\n    }\n    \n    return answer;\n}\n\n// "aya", "ye", "woo", "ma" 만 발음 가능\n// return input으로 주어지는 babbling에서 발음 가능한 단어의 개수\n\n// Algorithm Flow\n// ',
    uploadTime: {
      seconds: 1672325192,
      nanoseconds: 128000000,
    },
    selectedLanguage: 'javascript',
    passedTestCase: 12,
    failedTestCase: 0,
  },
];

export const loginMockData = {
  status: true,
  data: solutionList,
};

export const logoutMockData = {
  status: false,
};
