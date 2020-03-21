import React from 'react';
import './Menu.css';

const Menu = () => {

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }


    return (
        <div>
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <ul>
                    <li>
                        <a href="#">Audit Management</a>
                        <ul>
                            <li><a href="#" className="innerli active">Check lists</a></li>
                            <li><a href="#" className="innerli">Reports</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Vendor management</a>
                        <ul>
                            <li><a href="#" className="innerli">Manage vendors</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <span style={
                {
                    fontSize: "40px",
                    cursor: "pointer"

                }
            }
                onClick={openNav}>&#9776; </span>
        </div>
    );

}

export default Menu;