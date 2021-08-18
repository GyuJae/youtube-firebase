import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { VIDEOS } from "../contants";
import { dbService } from "../fbase";
import { IVideo } from "../types";
import { getFirebaseDate } from "../utils/getFirebaseDate";

const Container = styled.main`
  display: grid;
  width: 900px;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 10px;
  gap: 50px 20px;
  left: 130px;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    width: 500px;
    left: 120px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    left: 40px;
    width: 450px;
  }
`;

const VideoItem = styled.div`
  width: 300px;
  height: 150px;
  @media screen and (max-width: 850px) {
    width: 280px;
    height: 150px;
  }
  @media screen and (max-width: 600px) {
    width: 430px;
    height: 250px;
  }
  margin-bottom: 20px;
`;

const Thumbnail = styled.video`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.black};
  margin-bottom: 5px;
`;

const VideoSubContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
`;

const AdditionalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100px;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 7px;
`;

const DisplayName = styled.h3`
  font-size: 13px;
  color: ${(props) => props.theme.colors.black};
  opacity: 0.8;
  margin-bottom: 5px;
  &:hover {
    opacity: 1;
  }
`;

const CreateDate = styled.h4`
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
  opacity: 0.8;
`;

const Home = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const getVideos = async () => {
    const docRef = await dbService.collection(VIDEOS).get();

    docRef.forEach((doc) => {
      setVideos((prev) => [doc.data(), ...prev]);
    });
  };
  useEffect(() => {
    getVideos();
  }, []);

  const onMouseEnterPlay = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.play();
    event.currentTarget.muted = true;
  };
  const onMouseLeavePlay = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.currentTime = 0;
    event.currentTarget.pause();
  };

  return (
    <Container>
      {videos.length !== 0 &&
        videos.map((video: IVideo) => (
          <Link to={`watch/${video.id}`}>
            <VideoItem key={video.id}>
              <Thumbnail
                onMouseEnter={onMouseEnterPlay}
                onMouseLeave={onMouseLeavePlay}
              >
                <source src={video.videoLink}></source>
              </Thumbnail>
              <VideoSubContainer>
                <UserImg src={video.userPhotoURL} />
                <AdditionalContent>
                  <Title>
                    {video.title.length > 30
                      ? video.title.slice(0, 30) + "..."
                      : video.title}
                  </Title>
                  <DisplayName>{video.username}</DisplayName>
                  <CreateDate>{getFirebaseDate(video.createAt)}</CreateDate>
                </AdditionalContent>
              </VideoSubContainer>
            </VideoItem>
          </Link>
        ))}
    </Container>
  );
};

export default Home;
