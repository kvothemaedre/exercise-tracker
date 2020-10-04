import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function EditExercise(props) {
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(Date.now());
    const [users, setUsers] = useState([]);
    const inputEl = useRef(null);

    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    }
    const onChangeDate = (date) => {
        setDate(date);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: userName,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise);

        axios.post('http://localhost:7000/exercises/update/' + props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    const addUser = () => {
        axios.get('http://localhost:7000/exercises/' + props.match.params.id)
            .then(response => {
                console.log(response.data);
                setUserName(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date));

            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:7000/users/')
            .then(response => {
                setUsers(response.data.map(user => user.username));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(addUser, [])

    return (
        <div>
            <h3>Edit Exercise </h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={inputEl}
                        required
                        className="form-control"
                        value={userName}
                        onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise