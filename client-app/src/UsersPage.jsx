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

    async addUser() {
        const newUser = {
            username: 'Kongo',
            email: 'kongo@gmail.com',
            password: 'kongo',
            isActive: false,
            age: 210
        }
        await axios.post('http://0.0.0.0:3000/users', newUser);
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
                <button style={{marginTop: '100px'}} onClick={this.addUser}>Add User</button>
            </UsersContainer>
    )};
};

export default UsersPage;

