import React, {useEffect, useState} from 'react';
import BackButton from "../component/BackButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
const ShowBook = () => {
    const [book,setBook] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5555/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4' >Show Book</h1>
            {
                loading? (
                    <Spinner/>
                ):(
                    <div>
                        {book._id}<br/>
                        {book.title}<br/>
                        {book.author}<br/>
                        {book.publishYear}
                    </div>
                )
            }
        </div>
    );
};

export default ShowBook;