import React from "react";
import styled from "styled-components";
import UploadModal from "../components/UploadModal";
import { useVisible } from "../contexts/UploadModal";

const Container = styled.div`
  margin-left: 90px;
  @media screen and (max-width: 600px) {
    margin-left: 20px;
  }
`;

const Content = styled.div`
  padding-top: 100px;
`;

const Title = styled.h1`
  font-size: 27px;
  font-weight: 400;
  margin-bottom: 30px;
  margin-left: 15px;
`;

const VideoContainer = styled.div``;

const VideoList = styled.ul``;

const FileButton = styled.button`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 11px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.14px;
`;

const Upload = () => {
  const { visible, setVisible } = useVisible();
  return (
    <Container>
      <Content>
        <Title>채널 콘텐츠</Title>
        {setVisible && (
          <FileButton onClick={() => setVisible(true)}>
            동영상 업로드
          </FileButton>
        )}
        <VideoContainer>
          <VideoList></VideoList>
        </VideoContainer>
        <UploadModal visible={visible} />
      </Content>
    </Container>
  );
};

export default Upload;
