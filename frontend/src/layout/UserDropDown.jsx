import {Link} from "react-router-dom";
import profile from "../assets/images/profile.jpg"

const UserDropDown = () => {
    return (
            <div className="float-right mx-3 h-auto d-flex">
                <div className="user-dropdown ">
                    <img className="icon-nav-img" src={profile} alt="noImage"/>
                    <div className="user-dropdown-content rounded-1 ">
                        <div className="mt-4 text-center">
                            <h6>{""}</h6>
                            <hr className="user-dropdown-divider  p-0"/>
                        </div>
                        <Link to="/profile" className="side-bar-item">
                            <span className="side-bar-item-caption">Profile</span>
                        </Link>

                    </div>
                </div>
            </div>
    );
};
export default UserDropDown;