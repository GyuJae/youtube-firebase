import React, { useCallback } from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdFileUpload } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useVisible } from "../contexts/UploadModal";
import { useDropzone } from "react-dropzone";

interface IUploadModal {
  visible: boolean;
}

interface IForm {
  file: File;
}

const Container = styled.div<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? "none" : "hidden")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const InnerContent = styled.main`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  width: 1000px;
  height: 600px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const TabBar = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0px;
  border-bottom: 1.5px solid ${(props) => props.theme.colors.grayLine};
`;

const TabBarLeft = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;
const TabBarRight = styled.div`
  margin-right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.grayIcon};
  font-size: 20px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  &:hover {
    color: ${(props) => props.theme.colors.black};
  }
`;

const DropContainer = styled.div`
  margin-bottom: 35px;
`;

const DropLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DropIconContainer = styled.div<{ isDragActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  padding: 15px;
  width: ${(props) => (props.isDragActive ? "50px" : "100px")};
  height: ${(props) => (props.isDragActive ? "50px" : "100px")};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.grayIcon};
  background-color: ${(props) => props.theme.colors.grayWeak};
  margin-bottom: 23px;
  cursor: pointer;
  transition: all 0.5s ease-in;
  animation: rotate 1.5s linear
    ${(props) => (props.isDragActive ? "infinite" : "none")};
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

const DropSpanCore = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
`;
const DropSpanSub = styled.span`
  font-size: 13px;
  opacity: 0.7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  padding: 10px 13px;
  background-color: ${(props) => props.theme.colors.blue};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  font-size: 15px;
`;

const Input = styled.input`
  display: none;
`;

const UploadModal: React.FC<IUploadModal> = ({ visible }) => {
  const { register, handleSubmit } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  const { setVisible } = useVisible();

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "video/*",
  };

  const RootProps = {
    ...getRootProps(),
  };

  return (
    <Container visible={visible}>
      <InnerContent>
        <TabBar>
          <TabBarLeft>
            <span>동영상 업로드</span>
          </TabBarLeft>
          <TabBarRight>
            <IconContainer>
              <BsExclamationSquareFill
                style={{
                  marginRight: "20px",
                }}
              />
            </IconContainer>
            <IconContainer>
              {setVisible && <span onClick={() => setVisible(false)}>✖</span>}
            </IconContainer>
          </TabBarRight>
        </TabBar>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <DropContainer {...RootProps}>
            <DropLabel htmlFor="input-file">
              <DropIconContainer isDragActive={isDragActive}>
                <MdFileUpload />
              </DropIconContainer>
              <DropSpanCore>
                동영상 파일을 드래그 앤 드롭하여 업로드
              </DropSpanCore>
              <DropSpanSub>
                동영상을 게시하기 전에는 비공개로 설정됩니다.
              </DropSpanSub>
            </DropLabel>
          </DropContainer>
          <Label htmlFor="input-file">파일 선택</Label>
          <Input
            id="input-file"
            type="file"
            {...InputProps}
            {...(register("file"), { required: true })}
          />
          {/* <Input type="submit" /> */}
        </Form>
      </InnerContent>
    </Container>
  );
};

export default UploadModal;
