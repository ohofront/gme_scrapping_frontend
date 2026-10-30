import CircleLoader from "react-spinners/FadeLoader";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <CircleLoader
        color="#3b82f6"
        height={14}
        width={4}
        radius={4}
        margin={4}
      />
      <LoadingText>실시간 외환/수취액 데이터를 분석 중입니다...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 0;
  width: 100%;
`;

const LoadingText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.2px;
`;
