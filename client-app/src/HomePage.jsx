import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(6px + 2vmin);
`;

const HomePage = () => { 

  return (
    <Container>
        <h1>Frontend version 2</h1>
        <Link style={{color: 'white', marginBottom: '20px'}} to="/userspage">Users Page</Link>
        <Link style={{color: 'white'}} to="/chatpage">Chat Page</Link>
    </Container>
  );
}

export default HomePage;