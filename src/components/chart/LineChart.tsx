import styled, { keyframes } from 'styled-components';

const LineChart = () => {
  return (
    <ContainerStyle>
      <p>90%</p>
      <LineStyle>
        <FillStyle />
      </LineStyle>
    </ContainerStyle>
  );
};

export default LineChart;

const ContainerStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0;
  p {
    color: #fff;
  }
`;

const LineStyle = styled.div`
  background-color: black;
  padding: 4px;
  box-sizing: border-box;
`;

const FillStyle = styled.div`
  background: white;
  width: 50%;
  height: 10px;
`;

const lineFill = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100;
  }
`;
