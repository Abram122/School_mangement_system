// Loader.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoaderRing = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    animation: ${spin} 1.2s linear infinite;
  }
`;

const LoaderText = styled.div`
  color: black;
  font-size: 1.2rem;
  margin-left: 1rem;
  font-weight: bold;
`;

const Loader = ({ text = 'Loading...' }) => (
    <LoaderWrapper>
        <LoaderRing />
        <LoaderText>{text}</LoaderText>
    </LoaderWrapper>
);

export default Loader;
