import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import BookList from "./pages/BookList.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PasswordPage from "./pages/PasswordPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";
const App = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/password' element={<PasswordPage/>}/>
            <Route path='/forget-password' element={<ForgotPasswordPage/>}/>
            <Route path='/pagenot-found' element={<PageNotFound/>}/>
            <Route path='/otp' element={<OtpPage/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/bokolist' element={<BookList/>}/>
            <Route path='/books/create' element={<CreateBook/>}/>
            <Route path='/books/details/:id' element={<ShowBook/>}/>
            <Route path='/books/edit/:id' element={<EditBook/>}/>
        </Routes>
    );
};

export default App;