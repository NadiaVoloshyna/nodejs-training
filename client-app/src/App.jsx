import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import UsersPage from "./UsersPage.jsx";
import ChatPage from "./ChatPage.jsx";
import HomePage from './HomePage.jsx';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background: #252831;
		color: #fbfbef;
	}  
	ul::-webkit-scrollbar {
		width: 1em;
	}
	
	ul::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	}
	
	ul::-webkit-scrollbar-thumb {
		background-color: #3c4556;
		outline: 1px solid slategrey;
	}
`;

const App = () => [
  <GlobalStyle key="global-style" />,
  <BrowserRouter key="router">
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/userspage" element={<UsersPage />} />
      <Route exact path="/chatpage" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>
  ]

export default App;

