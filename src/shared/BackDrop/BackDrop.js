import { createPortal } from "react-dom"

import './BackDrop.css';

const BackDrop = props => {
    const content = <div className="backdrop" onClick={props.closeDrawer}></div>
    
   return createPortal(content, document.getElementById("backdrop"));
}

export default BackDrop;
