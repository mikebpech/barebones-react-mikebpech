import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';

let messages2 = [
  { from: 'fred', text: 'gwdfadawdawdawdawdaiwdjiawdioawojidiojdajiodd', id: 12921, timestamp: new Date('01/29/2021') },
  { from: 'mike', text: 'test', id: 222, timestamp: new Date('01/28/2021') }
]

const Chatbox = () => {
  const [messages, setMessages] = useState(messages2);
  useEffect(() => {
    // Add Messages for fun
    // setInterval(() => {
    //   setMessages(prev => [ ...prev, { from: 'mike', text: 'test', id: Math.random(), timestamp: new Date() }]);
    // }, 1000);
  }, []);

  return (
    <ChatWrap>
      <Messages>
        { messages.map(message => (
          <Message key={message.id} msg={message} />
        )) }
      </Messages>
    </ChatWrap>
  )
}

export default Chatbox;

const Messages = styled.ul`

`

const ChatWrap = styled.div`
  margin-top: 20px;
  height: fit-content;
  padding: 10px;
  border: 2px solid ${props => props.theme.colors.secondary};

  max-height: 550px;
  overflow-y: auto;
`

const Message = ({ msg, id }) => {
  return (
    <MessageBubble key={id}>
      <Sender>{msg.from} <div className="time">{new Date(msg.timestamp).getTime()}</div></Sender>
      <Text>{msg.text}</Text>
    </MessageBubble>
  )
}

const MessageBubble = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`

const Sender = styled.div`
  display: flex;
  width: 80px;
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};

  .time {
    width: fit-content;
    margin-left: 10px;
  }
`

const Text = styled.div`
  color: #fff;
  overflow-wrap: anywhere;
`