import React, { useState } from "react";
import BackButton from "../component/BackButton.jsx";
import Spinner from "../component/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(({...formData, [name]: value,}),);
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post(`http://localhost:5555/books`, formData);
        if (res) {
          setLoading(false);
          navigate('/')
        }
      } catch (e) {
        setLoading(false);
        alert("An Error Occur");
      }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
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
  );
};

export default CreateBook;
