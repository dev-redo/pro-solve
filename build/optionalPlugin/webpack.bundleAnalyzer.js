const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 분석된 결과를 파일로 저장
      reportFilename: `bundle-size.html.html`, // 분석 결과 파일명
      openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
    }),
  ],
};
