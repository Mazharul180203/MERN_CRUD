import React, {useState} from 'react';
import AppLayout from "../layout/AppLayout.jsx";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../utility/validationUtility.js";
import Spinner from "../component/Spinner.jsx";


const SignUpPage = () => {


    let [submit,setSubmit]=useState(false);
    let navigate=useNavigate();

    const onSubmit=async (event)=>{
        event.preventDefault();
        const formData=new FormData(event.target)
        let userName=formData.get('userName')
        if(ValidationHelper.isEmpty(userName)){
            toast.error("Email or Mobile Required !")
        }
        else {
            console.log("fdfdfsd");
        }
    }


    return (
        <AppLayout>
            <div className="container ">
                <div className="row center-screen ">
                    <div className="col-md-4 col-lg-4 col-sm-10 col-10">
                        <div className="card animated zoomIn p-5 gradient-bg">
                            <form onSubmit={onSubmit}>

                                <h4 className="fw-bold">SIGN UP</h4>
                                <div className="quotation-div">
                                    <p className="f-14">To sign up, you must know your Email or Mobile</p>
                                </div>

                                <label>Email or Mobile</label>
                                <input name="userName" type="text" className="form-control form-control-sm"/>

                                <button  type="submit"  disabled={submit} className="btn btn-sm btn-danger btn-block form-control mt-3">
                                    {submit?(<Spinner/>):("Next")}
                                </button>

                                <div className="mt-2 text-center">
                                    <Link className="nav-link fw-medium text-dark" to="/">Already Have Account?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SignUpPage;
