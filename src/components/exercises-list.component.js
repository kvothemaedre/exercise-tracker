import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//component that displays a row of exercises
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <button onClick={(eve) => {
                eve.preventDefault();
                props.deleteExercise(props.exercise._id)
            }}>delete</button>
        </td>
    </tr>
)

function ExercisesList() {
    const [exerciseList, setExerciseList] = useState([]);

    const loadExercise = () => {
        axios.get('http://localhost:7000/exercises/')
            .then(response => {
                setExerciseList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(loadExercise, []);

    const deleteExercise = (id) => {
        axios.delete('http://localhost:7000/exercises/' + id)
            .then(res => console.log(res.data));
        setExerciseList(exerciseList.filter(el => el._id !== id));
    }

    //the exercise list displayed 
    const exerciseListRender = () => {
        return exerciseList.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
        })
    }
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseListRender()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;