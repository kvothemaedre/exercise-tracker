import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [userName, setUserName] = useState('');

    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setUserName(userName);
        const user = {
            username: userName
        };
        console.log(user);
        axios.post('http://localhost:7000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        setUserName('');

    }

    return (
        <div>
            <div>
                <h3>Create New User</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={userName}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser