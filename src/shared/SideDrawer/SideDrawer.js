import React from 'react';
import { createPortal } from 'react-dom';
import './SideDrawer.css';

const SideDrawer = props => {

    const content = (
        <div className='side-drawer' style={props.style}>
            {props.children}
        </div>

    );
    return createPortal(content, document.getElementById("sideDrawer"));
}

export default SideDrawer;