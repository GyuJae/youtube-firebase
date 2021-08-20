import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadModal from "../components/UploadModal";
import { VIDEOS } from "../contants";
import { useUser } from "../contexts/Auth";
import { useVisible } from "../contexts/UploadModal";
import { dbService } from "../fbase";

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

const VideoContainer = styled.div`
  margin-top: 20px;
`;

const VideoList = styled.ul``;

const VideoItem = styled.li``;

const FileButton = styled.button`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 11px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.14px;
  margin-left: 30px;
`;

const Upload = () => {
  const { visible, setVisible } = useVisible();
  const user = useUser();
  const [videos, setVideos] = useState<any[]>();
  useEffect(() => {
    dbService
      .collection(VIDEOS)
      .where("userId", "==", user?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setVideos((prev) => {
            if (prev) {
              return [...prev, doc.data()];
            }
            return [doc.data()];
          });
        });
      });
  }, [user?.uid]);
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
          <VideoList>
            {videos?.map((video) => (
              <VideoItem key={video.id}>{video.title}</VideoItem>
            ))}
          </VideoList>
        </VideoContainer>
        <UploadModal visible={visible} />
      </Content>
    </Container>
  );
};

export default Upload;
