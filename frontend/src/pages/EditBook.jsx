import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../component/BackButton.jsx";
import Spinner from "../component/Spinner.jsx";
import axios from "axios";
import SideNavLayout from "../layout/SideNavLayout.jsx";

const EditBook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] =useState({
        title: "",
        author: "",
        publishYear: "",
    });
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(({...formData, [name]: value,}),);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(`http://localhost:5555/books/${id}`, formData);
            if (res) {
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            console.log("Error has occurred:", error);
        }
    }

    return (
        <SideNavLayout>
            <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ""}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="publishYear">Publish Year:</label>
                    <input
                        type="text"
                        id="publishYear"
                        name="publishYear"
                        value={formData.publishYear}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </SideNavLayout>
    );
};

export default EditBook;