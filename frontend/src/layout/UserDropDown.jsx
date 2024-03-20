
const UserDropDown = () => {
    return (
            <div className="float-right mx-3 h-auto d-flex">
                <div className="user-dropdown ">
                    <img className="icon-nav-img" src="" alt="noImage"/>
                    <div className="user-dropdown-content rounded-1 ">
                        <div className="mt-4 text-center">
                            <img className="icon-nav-img-lg" src=" " alt="noImage"/>
                            <h6>{""}</h6>
                            <hr className="user-dropdown-divider  p-0"/>
                        </div>
                        {/*<a href={`${basePath()}/api/v1/AuthDestroy`} className="side-bar-item">*/}
                        {/*    <span className="side-bar-item-caption">Logout</span>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>
    );
};
export default UserDropDown;