import React from 'react';
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const MessageInput = () => {
  return (
    <InputWrap>
      <Input action={{ icon: 'send' }} placeholder='Message...' />
    </InputWrap>
  )
}

export default MessageInput;

const InputWrap = styled.div`
  position: absolute;
  bottom: 10px;
`