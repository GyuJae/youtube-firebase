import React, { useState } from "react";
import { MdHome, MdSubscriptions } from "react-icons/md";
import { FaBars, FaCompass } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { AiFillPlaySquare } from "react-icons/ai";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SideContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 20px;
  font-size: 25px;
  margin-right: 20px;
  color: ${(props) => props.theme.colors.grayIcon};
  width: 80px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const BarsContainer = styled.div`
  margin-bottom: 25px;
`;

const SideIconContainer = styled.div<{ currentPath: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 70px;
  color: ${(props) => props.currentPath && props.theme.colors.red};
  &:hover {
    background-color: ${(props) => props.theme.colors.grayHover};
  }
`;

const IconSpan = styled.span`
  font-size: 7px;
  margin-top: 5px;
`;

const BarsIcon = styled(FaBars)`
  font-size: 20px;
`;

const HomeIcon = styled(MdHome)``;

const SubscriptionsIcon = styled(MdSubscriptions)``;

const CompassIcon = styled(FaCompass)``;

const Side = () => {
  const [sideShow, setSideShow] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <SideContainer>
        <BarsContainer onClick={() => setSideShow(!sideShow)}>
          <BarsIcon />
        </BarsContainer>
        <SideIconContainer currentPath={pathname === "/"}>
          <HomeIcon />
          <IconSpan>홈</IconSpan>
        </SideIconContainer>
        <SideIconContainer currentPath={pathname === "/search"}>
          <CompassIcon />
          <IconSpan>탐색</IconSpan>
        </SideIconContainer>
        <SideIconContainer currentPath={pathname === "/subscript"}>
          <SubscriptionsIcon />
          <IconSpan>구독</IconSpan>
        </SideIconContainer>
        <SideIconContainer currentPath={pathname === "/collection"}>
          <AiFillPlaySquare />
          <IconSpan>보관함</IconSpan>
        </SideIconContainer>
        <SideIconContainer currentPath={pathname === "/record"}>
          <FiClock />
          <IconSpan>시청 기록</IconSpan>
        </SideIconContainer>
      </SideContainer>
    </>
  );
};

export default Side;
