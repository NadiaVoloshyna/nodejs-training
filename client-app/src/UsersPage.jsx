import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(6px + 2vmin);
`;

class UsersPage extends Component {
    state = {
        users: [{username: 'Loading...'}]
    }

    componentDidMount() {
        this.fetchUsers();
    };

    async fetchUsers() {
        const users = await axios.get('http://localhost:3000/users');
        this.setState({users: users.data});
        console.log(users)
    }

    render() {
        return (
            <UsersContainer>
                <h2>Users Page</h2>
                <Link style={{color: 'white'}} to="/">home</Link>
                    <h3>List of users</h3>
                    {
                        this.state.users.map(user => 
                        <div key={user.username}>{user.username}</div>
                    )}
            </UsersContainer>
    )};
};

export default UsersPage;

