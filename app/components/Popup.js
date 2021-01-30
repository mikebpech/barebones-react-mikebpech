import React from 'react';
import styled from 'styled-components';
import Chatbox from './Chatbox';
import MessageInput from './MessageInput';

const Popup = () => {
  return (
    <PopupContainer>
      <h1 id="popup-title"><i className="fas fa-dragon"></i> OnTask</h1>
      <Chatbox />
      <MessageInput />
    </PopupContainer>
  )
}

export default Popup;

const PopupContainer = styled.main`
  /* Temp */
  margin: 40px;

  position: relative;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.styles.borderRadius};
  color: ${props => props.theme.colors.textColor};
  max-width: ${props => props.theme.styles.maxPopupWidth};
  min-height: 700px;
  padding: 20px;
`
