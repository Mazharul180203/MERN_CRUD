import React, {useState} from 'react';
import BackButton from "../component/BackButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {useNavigate} from "react-router-dom";

const CreateBook = () => {
    const [title,setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();




    return (
        <div>
            <h1>My Name is saurav</h1>
        </div>
    );
};

export default CreateBook;