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
                    <div className="container">
                        <div className="row">
                            <div className="col">
                              <table className="table table-responsive">
                                  <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Publish Year</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                        <td>{book._id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publishYear}</td>
                                    </tr>
                                  </tbody>
                              </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ShowBook;