import React, {useState} from 'react';
import AppLayout from "../layout/AppLayout.jsx";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ValidationHelper from "../utility/validationUtility.js";
import Spinner from "../component/Spinner.jsx";

const PasswordPage = () => {

    let [submit,setSubmit]=useState(false);
    let navigate=useNavigate();

    const onSubmit=async (event)=>{

        event.preventDefault();
        const formData=new FormData(event.target)
        let password=formData.get('password')
        let cpassword=formData.get('cpassword')

        if(ValidationHelper.isEmpty(password)){
            toast.error("Password required!")
        }
        else if(ValidationHelper.isEmpty(cpassword)){
            toast.error("Confirm password required!")
        }
        else if(!ValidationHelper.isPasswordConfirmed(password,cpassword)){
            toast.error("Password & confirm password should be same")
        }
        else {
           console.log("sdfsdf");
        }
    }

    return (
        <AppLayout>
            <div className="container ">
                <div className="row center-screen ">
                    <div className="col-md-4">
                        <div className="card animated zoomIn p-5 gradient-bg">
                            <form onSubmit={onSubmit}>
                                <h4 className="fw-bold">SET NEW PASSWORD</h4>

                                <label>New Password</label>
                                <input name="password" type="password" className="form-control form-control-sm"/>

                                <label>Confirm New Password</label>
                                <input name="cpassword"  type="password" className="form-control form-control-sm"/>

                                <button  type="submit"  disabled={submit} className="btn btn-danger btn-block btn-sm form-control mt-3">
                                    {submit?(<Spinner/>):("Submit")}
                                </button>

                                <div className="mt-2 text-center">
                                    <Link className="nav-link text-dark fw-bold"  to="/">Already Have Account?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PasswordPage;
