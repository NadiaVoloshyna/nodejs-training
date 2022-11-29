import React, {useState, useEffect, useRef} from "react";
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import MessagesList from './MessagesList.jsx';

const H1 = styled.h1`
	position: relative;
	text-align: center;
	letter-spacing: 10px;
`;

const ChatContainer = styled.div`
  color: #fbfbef;
  font-family: "Consolas", monospace;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Status = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 3px 10px;
  border-radius: 5px;
  font-size: 13px;
  background: ${props => (props.status === 'online' ? '#6fb472' : '#F06292')};
`;

const Form = styled.form`
  position: relative;
  margin: 20px 30px;
  &::before {
    content: "~msg$:";
    position: absolute;
    left: 14px;
    top: 11px;
    color: #dcd1c4;
    font-size: 16px;
  }
  &::after {
    content: "↵";
    position: absolute;
    right: 20px;
    top: 0px;
    color: #dcd1c4;
    font-size: 30px;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: #3c4556;
  border-radius: 5px;
  color: #ece7dc;
  width: 100%;
  height: 40px;
  text-indent: 82px;
  display: block;
  font-size: 16px;
  font-family: "Consolas", monospace;
  flex: 1;
`;

const ChatPage = () => {
  const [value, setValue] = useState('');
  const [io, setIo] = useState(null);
  const [status, setStatus] = useState('offline');
  const [messages, setMessages] = useState([]);
  const el = useRef(null);
  const [userId, setUserId] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:3001";
    // const chat = socketIOClient(URL);
    const chat = socketIOClient();

    setIo(chat);

    chat.on('connect', () => {
      console.info(`I'm connected with the back-end`);
      setStatus('online');
    });

    chat.on('userConnected', user => {
			setActiveUsers(u => u.concat(user.nick));
		});

		chat.on('userDisconnected', user => {
			setActiveUsers(u => u.filter(name => name !== user.nick));
		});

		chat.on('activeUsers', users => {
			console.info('activeUsers', users);
			setActiveUsers(() => Array.from(users));
		});

    chat.on('message', m => {
			console.info('> New message', m)
			if (m.currUserId) {
				setUserId(m.currUserId);
			}

			setMessages(d => d.concat(m));
			if (el.current) {
				el.current.scrollTop = el.current.scrollHeight;
			}
		});

    return () => {
			console.warn('DISCONNECT')
			chat.disconnect();
		}

  }, []);  

  return (
    <ChatContainer>
      <Status status={status}>{status}</Status>
      <Link style={{color: 'white', fontSize: 'calc(6px + 2vmin)'}} to="/">home</Link>
      <H1>NWSD</H1>
      <MessagesList
				el={el}
				messages={messages}
				userId={userId}
				activeUsers={activeUsers}
			/>
      <Form
				onSubmit={e => {
					e.preventDefault();
					if (value !== '') {
						io.emit('message', value);
						setValue('');
					}
				}}
			>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter your message"
      />
			</Form>
    </ChatContainer>
  );
}

export default ChatPage;

