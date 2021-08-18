import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { VIDEOS } from "../contants";
import { dbService } from "../fbase";
import { IVideo } from "../types";
import { getFirebaseDate } from "../utils/getFirebaseDate";

interface IParam {
  id: string;
}

const Container = styled.main``;

const VideoContainer = styled.div`
  margin-left: 25px;
`;

const Video = styled.video`
  width: 1000px;
  height: 500px;
  margin-bottom: 15px;
`;

const SubContainer = styled.div`
  margin-bottom: 15px;
  border-bottom: 1.5px solid ${(props) => props.theme.colors.grayLine};
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

const CreateAt = styled.h4`
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  opacity: 0.7;
  margin-bottom: 15px;
`;

const AdditionalContent = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DisplayName = styled.h2`
  font-size: 17px;
  margin-bottom: 15px;
`;

const Description = styled.h3``;

const Detail = () => {
  const { id } = useParams<IParam>();
  const [video, setVideo] = useState<IVideo | any | null>(null);
  useEffect(() => {
    dbService
      .collection(VIDEOS)
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setVideo(doc.data());
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);
  return (
    <Container>
      {video && (
        <VideoContainer>
          <Video autoPlay controls>
            <source src={video.videoLink}></source>
          </Video>
          <SubContainer>
            <Title>{video.title}</Title>
            <CreateAt>{getFirebaseDate(video.createAt)}</CreateAt>
          </SubContainer>
          <AdditionalContent>
            <UserImg src={video.userPhotoURL} />
            <DescriptionContainer>
              <DisplayName>{video.username}</DisplayName>
              <Description>{video.description}</Description>
            </DescriptionContainer>
          </AdditionalContent>
        </VideoContainer>
      )}
    </Container>
  );
};

export default Detail;
