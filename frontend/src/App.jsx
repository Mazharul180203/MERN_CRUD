import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import BookList from "./pages/BookList.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./pages/Home.jsx";
const App = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/bokolist' element={<BookList/>}/>
            <Route path='/books/create' element={<CreateBook/>}/>
            <Route path='/books/details/:id' element={<ShowBook/>}/>
            <Route path='/books/edit/:id' element={<EditBook/>}/>
        </Routes>
    );
};

export default App;