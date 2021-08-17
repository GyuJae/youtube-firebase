import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { VIDEOS } from "../contants";
import { dbService } from "../fbase";

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 10px;
  gap: 10px;
`;

const VideoItem = styled.div``;

const Thumbnail = styled.video`
  width: 300px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.black};
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
    event.currentTarget.pause();
  };

  return (
    <Container>
      {videos.length !== 0 &&
        videos.map((video) => (
          <VideoItem>
            <h1>{video.title}</h1>
            <h1>{video.userId}</h1>
            <Thumbnail
              onMouseEnter={onMouseEnterPlay}
              onMouseLeave={onMouseLeavePlay}
            >
              <source src={video.videoLink}></source>
            </Thumbnail>
          </VideoItem>
        ))}
    </Container>
  );
};

export default Home;
