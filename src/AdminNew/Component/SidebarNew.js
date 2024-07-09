import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/SidebarNew.css';

function SidebarNew() {
    return (
        <div className='wrap-sidebar-new'>
            <div className='sidebar-new-content'>
                <div className='sidebar-new-content-logo'>Trip Planner Data Master</div>
                <div className='sidebar-new-content-menu'>
                    <ul className='sidebar-new-content'>
                        <li className='sidebar-item-new'>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className='sidebar-item-new'>
                            <Link to="/agent">Agen</Link>
                        </li>
                        <li className='sidebar-item-new-dropdown'>
                            <span>Akomodasi</span>
                            <ul className='dropdown-content-new'>
                                <li><Link to="/hotel">Hotel</Link></li>
                                <li><Link to="/transport">Transportasi</Link></li>
                                <li><Link to="/culinary">Kuliner</Link></li>
                            </ul>
                        </li>
                        <li className='sidebar-item-new'>
                            <Link to="/package">Paket</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidebarNew;
