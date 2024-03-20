import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner.jsx";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async(id) =>{
      try{
          setLoading(true);
          const response = await axios.delete(`http://localhost:5555/books/${id}`);
          if(response){
              window.location.reload();
          }
      }catch (e) {
          console.error("Something gone Wrong",e);
      }

  }

  return (
    <div className="p-4">
      <div>
        <h1 className="flex justify-content-center mb-4">Book List</h1>
        <Link to="/books/create">
          <buttonn>Add</buttonn>
        </Link>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full broder-separate border-spacing-2 mt-6">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publish Year</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {
                    books.map((item, i) => {
                      return (
                          <tr key={item._id} className="h-8">
                              <td>{i + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.author}</td>
                              <td>{item.publishYear}</td>
                              <td>
                                  <div className="flex gap-x-4">
                                      <Link to={`/books/details/${item._id}`}>
                                          <BsInfoCircle className="text-2xl text-green-800" />
                                      </Link>
                                      <Link to={`/books/edit/${item._id}`}>
                                          <AiOutlineEdit className="text-2xl text-yellow-800" />
                                      </Link>
                                      <button onClick={() => handleDelete(item._id)}>
                                          <MdOutlineDelete className="text-2xl text-red-800" />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      );
                    }
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;

