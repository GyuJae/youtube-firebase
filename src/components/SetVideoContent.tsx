import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { VIDEOS } from "../contants";
import { useUser } from "../contexts/Auth";
import { dbService } from "../fbase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ISetVideoContext {
  videoLink: string;
}

interface IForm {
  title: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  margin-left: 90px;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Title = styled.h2``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const InputContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  display: inline-block;
  padding: 3px;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.colors.blue : props.theme.colors.grayLine};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  color: ${(props) =>
    props.active ? props.theme.colors.blue : props.theme.colors.black};
`;

const Label = styled.label`
  display: block;
  font-size: 10px;
  margin-bottom: 10px;
`;

const InputTitle = styled.input`
  outline: none;
  border: none;
  display: block;
  line-height: 1.2em;
  font-size: 12px;
  width: 450px;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80%;
  resize: none;
  outline: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
`;

const Video = styled.video`
  width: 300px;
  height: 180px;
`;

const TextCount = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${(props) => props.theme.colors.grayIcon};
  font-size: 13px;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1.5px solid ${(props) => props.theme.colors.grayLine};
`;

const Submit = styled.input`
  background-color: ${(props) => props.theme.colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  color: ${(props) => props.theme.colors.white};
  margin: 7px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  border: none;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 0;
  height: 80%;
  width: 90%;
`;

const IconContainer = styled.div`
  animation: rotate_image 1.3s linear infinite;
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
  height: 30px;
  width: 30px;
  color: ${(props) => props.theme.colors.blue};
`;

const ErrorSpan = styled.span`
  margin-left: 15px;
  color: ${(props) => props.theme.colors.red};
`;

const SetVideoContent: React.FC<ISetVideoContext> = ({ videoLink }) => {
  const { register, handleSubmit } = useForm<IForm>();
  const history = useHistory();
  const [descriptionText, setDescriptionText] = useState<string | null>(null);
  const [uploadError, setError] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const user = useUser();
  const onSubmit: SubmitHandler<IForm> = ({ title }) => {
    setUploadLoading(true);
    if (user) {
      dbService
        .collection(VIDEOS)
        .add({
          userId: user?.uid,
          title,
          description: descriptionText,
          videoLink,
        })
        .then(() => {
          setUploadLoading(false);
          history.go(0);
        })
        .catch((error) => {
          setUploadLoading(false);
          setError(error);
        });
    }
  };
  const [textCount, setTextConut] = useState<number>(0);
  const [titleActive, setTitleActive] = useState<boolean>(false);
  const [descriptionActive, setDescriptionActive] = useState<boolean>(false);
  const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setTextConut(value.length);
    setDescriptionText(value);
  };

  return (
    <Container>
      <Title>세부 정보</Title>
      {uploadLoading ? (
        <LoadingContainer>
          <IconContainer>
            <AiOutlineLoading3Quarters />
          </IconContainer>
        </LoadingContainer>
      ) : (
        <Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer active={titleActive}>
              <Label htmlFor="title">제목(필수 항목)</Label>
              <InputTitle
                id="title"
                {...register("title", { required: true })}
                placeholder="제목을 알려주세요"
                onFocus={() => setTitleActive(true)}
                onBlur={() => setTitleActive(false)}
              />
            </InputContainer>
            <InputContainer
              style={{
                height: "250px",
              }}
              active={descriptionActive}
            >
              <Label htmlFor="description">설명</Label>
              <Textarea
                placeholder="시청자에게 동영상을 알려주세요"
                onChange={textOnChange}
                maxLength={5000}
                onFocus={() => setDescriptionActive(true)}
                onBlur={() => setDescriptionActive(false)}
              ></Textarea>
              <TextCount>{textCount}/ 5000</TextCount>
            </InputContainer>
            <Footer>
              <div>{uploadError && <ErrorSpan>{uploadError}</ErrorSpan>}</div>
              <Submit type="submit" value="다음" />
            </Footer>
          </Form>
          <Video autoPlay controls>
            <source src={videoLink}></source>
          </Video>
        </Content>
      )}
    </Container>
  );
};

export default SetVideoContent;
