import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner.jsx";

const Home = () => {
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full broder-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-600 rounded-md">No</th>
                  <th className="border border-slate-600 rounded-md">Title</th>
                  <th className="border border-slate-600 rounded-md mx-md:hidden">
                    Author
                  </th>
                  <th className="border border-slate-600 rounded-md mx-md:hidden">
                    Publish Year
                  </th>
                  <th className="border border-slate-600 rounded-md">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((item, i) => {
                  return (
                    <tr key={item._id} className="h-8">
                      <td className="border border-slate-700 rounded-md text-center">
                        {i + 1}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {item.title}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center mx-md:hidden">
                        {item.author}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center mx-md:hidden">
                        {item.publishYear}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        <div className="flex justify-center gap-x-4">
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
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
