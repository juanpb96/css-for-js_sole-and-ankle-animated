/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import { QUERIES, WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const navLinks = [
  { link: "/sale", label: "Sale" },
  { link: "/new", label: <>New&nbsp;Releases</> },
  { link: "/men", label: "Men" },
  { link: "/women", label: "Women" },
  { link: "/kids", label: "Kids" },
  { link: "/collections", label: "Collections" },
];

const footerLinks = [
  { link: "/terms", label: "Terms and Conditions" },
  { link: "/privacy", label: "Privacy Policy" },
  { link: "/contact", label: "Contact Us" },
];

const MobileMenu = ({ isOpen, onDismiss }) => {
  const [showExitAnimation, setShowExitAnimation] = useState(false);
  const enableInitialAnimation = false; // Initial goal animation
  const animationsTotal = 3;
  let counter = 0;

  const onOverlayDismiss = () => {
    setShowExitAnimation(true);
  };

  const onAnimationEnd = () => {
    counter += 1;

    if (showExitAnimation && counter === animationsTotal) {
      setShowExitAnimation(false);
      onDismiss();
      counter = 0;
    }
  };

  return (
    <Overlay
      isOpen={isOpen}
      onDismiss={onOverlayDismiss}
      $close={showExitAnimation}
      onAnimationEnd={onAnimationEnd}
    >
      <Content
        aria-label="Menu"
        $initial={enableInitialAnimation}
        $close={showExitAnimation}
      >
        <CloseButton onClick={onOverlayDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          {navLinks.map((navItem, index) => (
            <NavLink
              key={navItem.label}
              $initial={enableInitialAnimation}
              $delayOrder={index}
              $close={showExitAnimation}
              href={navItem.link}
            >
              {navItem.label}
            </NavLink>
          ))}
        </Nav>
        <Footer>
          {footerLinks.map((navItem, index) => (
            <SubLink
              key={navItem.label}
              $initial={enableInitialAnimation}
              $delayOrder={navLinks.length + index}
              $close={showExitAnimation}
              href={navItem.link}
            >
              {navItem.label}
            </SubLink>
          ))}
        </Footer>
      </Content>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const doorClose = keyframes`
  from {
    transform: rotateY(-90deg);
  }
  to {
    transform: rotateY(0);
  }
`;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;
  perspective: 900px;

  ${(props) =>
    props.$close
      ? css`
          animation: ${fadeOut} 300ms ease-in both;
          animation-delay: 600ms;
        `
      : css`
          animation: ${fadeIn} 200ms ease-out both;
        `};
`;

const Content = styled(DialogContent)`
  position: relative;
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  // Initial goal animation
  ${(props) =>
    props.$initial &&
    (props.$close
      ? css`
          animation: ${slideOut} 200ms ease-in both;
          animation-delay: 300ms;
        `
      : css`
          animation: ${slideIn} 200ms ease-out both;
          animation-delay: 200ms;
        `)}

  // Stretch goal animation
  ${(props) =>
    !props.$initial &&
    (props.$close
      ? css`
          animation: ${slideOut} 200ms ease-in both;
          animation-delay: 300ms;
        `
      : css`
          transform-origin: right center;
          animation: ${doorClose} 500ms ease-out both alternate;
          animation-delay: 200ms;
        `)}

  &::before {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: 0;
    background-color: white;

    ${(props) =>
      props.$close
        ? css`
            animation: ${fadeIn} 200ms ease-in both;
          `
        : css`
            animation: ${fadeOut} 200ms ease-out both;
            animation-delay: 400ms;
          `};
  }
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const slideInToVisible = keyframes`
  from {
    opacity: 0;
    transform: translateX(30%);
  }
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;
  display: inline-block;

  ${(props) =>
    !props.$initial &&
    css`
      animation: ${slideInToVisible} 300ms ease-out both;
      animation-delay: calc(600ms + (200ms * ${props.$delayOrder}));
      animation-play-state: ${props.$close ? "paused" : "running"};
    `};

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;

  ${(props) =>
    !props.$initial &&
    css`
      animation: ${slideInToVisible} 300ms ease-out both;
      animation-delay: calc(600ms + (200ms * ${props.$delayOrder}));
      animation-play-state: ${props.$close ? "paused" : "running"};
    `};
`;

export default MobileMenu;
