import React, {useState} from 'react';
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import ValidationHelper from "../utility/validationUtility.js";
import AppLayout from "../layout/AppLayout.jsx";
import Spinner from "../component/Spinner.jsx";



const LoginPage = () => {

    let [submit,setSubmit]=useState(false);
    const onSubmit=async (event)=>{
        event.preventDefault();
        const formData=new FormData(event.target)
        let userName=formData.get('userName')
        let userPassword=formData.get('userPassword')
        if(ValidationHelper.isEmpty(userName)){
            toast.error("Email or Mobile Required !")
        }
        else if(ValidationHelper.isEmpty(userPassword)) {
            toast.error("Password Required !")
        }
        else {
            console.log("dfasdfasdf");
        }
    }
    return (
        <AppLayout>
            <div className="container ">
                <div className="row center-screen">
                    <div className="col-md-4 col-lg-4 col-sm-10 col-10">
                        <div className="card animated zoomIn p-5 gradient-bg">
                            <form onSubmit={onSubmit}>

                                <h4 className="fw-bolder">USER LOGIN</h4>
                                <div className="quotation-div"><p>Welcome to IDLC AML Service Portal</p></div>

                                <label>Email or Mobile</label>
                                <input name="userName" type="text" className="form-control form-control-sm"/>

                                <label>Password</label>
                                <input name="userPassword" type="password" className="form-control form-control-sm"/>

                                <button  type="submit"  disabled={submit} className="btn btn-danger btn-block form-control btn-sm mt-3">
                                    {submit?(<Spinner/>):("LOGIN")}
                                </button>

                                <Link to="/SignUp" type="button" className="btn btn-outline-danger btn-block btn-sm form-control mt-2"> SIGN UP</Link>

                            </form>
                            <div className="mt-2 text-center">
                                <Link className="nav-link text-dark fw-medium" to="/forgot-password" >Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default LoginPage;

