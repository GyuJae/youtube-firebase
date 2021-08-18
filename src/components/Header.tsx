import React from "react";
import { useState } from "react";
import { FaYoutube, FaUserCircle } from "react-icons/fa";
import { RiFileUserFill } from "react-icons/ri";
import { BsBoxArrowInRight } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../contexts/Auth";
import { authService, firebaseInstance } from "../fbase";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  z-index: 1000;
`;

const ListContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
`;

const LeftListContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  @media screen and (max-width: 600px) {
    margin-left: 0px;
  }
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50px;
`;

const YoutubeIcon = styled(FaYoutube)`
  color: ${(props) => props.theme.colors.red};
  font-size: 30px;
`;

const YoutubeSpan = styled.span`
  font-weight: 600;
  font-size: 23px;
  letter-spacing: -1.8px;
`;

const RightContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.blue};
  font-size: 15px;
  border: 1px solid;
  cursor: pointer;
  border-radius: 3px;
`;

const LogInButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

const UserIcon = styled(FaUserCircle)`
  margin-right: 5px;
  font-size: 26px;
`;

const ProfileContainer = styled.div``;

const ProfileMenu = styled.div<{ showProfile: boolean }>`
  position: absolute;
  width: 280px;
  right: 70px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  border-left: 1.2px solid ${(props) => props.theme.colors.grayLine};
  border-right: 1.2px solid ${(props) => props.theme.colors.grayLine};
  z-index: 1;
  display: ${(props) => (props.showProfile ? "block" : "none")};
  transition: all 1s ease-in;
`;

const MyInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.grayLine};
  padding: 20px;
`;

const MyName = styled.span`
  font-weight: 600;
`;

const ProfileOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.grayLine};
`;

const Option = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.colors.grayIcon};
  &:hover {
    background-color: ${(props) => props.theme.colors.grayHover};
  }
  cursor: pointer;
`;

const MyChannalLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const OptionIcon = styled.div`
  font-size: 28px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
`;

const OptionSpan = styled.span`
  color: ${(props) => props.theme.colors.black};
`;

const Header = () => {
  const user = useUser();
  const history = useHistory();
  const [showProfile, setShowProfile] = useState(false);
  const login = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    authService.signInWithPopup(provider);
  };
  const logOut = async () => {
    authService.signOut();
    history.go(0);
  };

  return (
    <NavContainer>
      <ListContainer>
        <LeftListContainer>
          <SLink to="/">
            <YoutubeIcon />
            <YoutubeSpan>YouTube</YoutubeSpan>
          </SLink>
        </LeftListContainer>
        <RightContainer>
          {user ? (
            <ProfileContainer>
              <ProfileMenu showProfile={showProfile}>
                <MyInformation>
                  <Img
                    src={user.photoURL as string}
                    style={{
                      marginRight: "15px",
                    }}
                  />
                  <MyName>{user.displayName}</MyName>
                </MyInformation>
                <ProfileOptions>
                  <MyChannalLink to="/upload">
                    <Option>
                      <OptionIcon>
                        <RiFileUserFill />
                      </OptionIcon>
                      <OptionSpan>내 채널</OptionSpan>
                    </Option>
                  </MyChannalLink>
                  <Option onClick={logOut}>
                    <OptionIcon>
                      <BsBoxArrowInRight />
                    </OptionIcon>
                    <OptionSpan>로그아웃</OptionSpan>
                  </Option>
                </ProfileOptions>
              </ProfileMenu>
              <Img
                src={user.photoURL as string}
                onClick={() => setShowProfile(!showProfile)}
              />
            </ProfileContainer>
          ) : (
            <LoginContainer onClick={login}>
              <UserIcon />
              <LogInButton>로그인</LogInButton>
            </LoginContainer>
          )}
        </RightContainer>
      </ListContainer>
    </NavContainer>
  );
};

export default Header;
