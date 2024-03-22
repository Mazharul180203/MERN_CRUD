import React, {useState} from 'react';
import AppLayout from "../layout/AppLayout.jsx";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ValidationHelper from "../utility/validationUtility.js";
import Spinner from "../component/Spinner.jsx";


const OtpPage = () => {

    let [submit,setSubmit]=useState(false);

    const onSubmit=async (event)=>{
        event.preventDefault();
        const formData=new FormData(event.target)
        let otp=formData.get('otp')
        if(ValidationHelper.isEmpty(otp)){
            toast.error("Verification code required!")
        }
        else {
            console.log("dfsdfsdfse");
        }
    }


    return (
        <AppLayout>
            <div className="container ">
                <div className="row center-screen ">
                    <div className="col-md-4">
                        <div className="card animated  p-5 zoomIn gradient-bg">
                            <form onSubmit={onSubmit}>
                                <h4 className="fw-bold">VERIFICATION</h4>
                                <div className="quotation-div">
                                    <p className="f-14">A 6 digit verification code has been sent to your registered email & phone number</p>
                                </div>
                                <div className="form-group">
                                    <label>Verification Code</label>
                                    <input name="otp" type="text" className="form-control form-control-sm"/>
                                </div>

                                <button  type="submit"  disabled={submit} className="btn btn-danger btn-sm btn-block form-control mt-2">
                                    {submit?(<Spinner/>):("Verify")}
                                </button>

                                <div className="mt-2 text-center">
                                    <Link className="nav-link f-14 text-dark fw-bold" to="/">Already Have Account?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default OtpPage;
