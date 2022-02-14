
import { useState } from 'react';
import '../MainHeader/MainHeader.css';
import Logo from '../logo/Logo';
import { AiOutlineMenu } from "react-icons/ai";
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../BackDrop/BackDrop';
const MainHeader = props => {
    const [drawer, setDrawer] = useState(false);


    const openDrawer = () => setDrawer(true);
    const closeDrawer = () => setDrawer(false);
    return (
        <header>
            {drawer && <BackDrop closeDrawer={closeDrawer} />}
            <SideDrawer show={drawer} style={drawer?{left:'0'}:{left:'-100%'}} >
                <NavLinks navClass="nav-mobile" style={{backgroundColor:"transparent",color:"#000"}} isLoggedIn={props.isLoggedIn} onClick={closeDrawer}/>
            </SideDrawer>
            <AiOutlineMenu className='menu-icon ' onClick={openDrawer} />
            <div className='app-name'><Logo />Canteen</div>
            <NavLinks navClass='nav-desktop' style={{backgroundColor:"transparent",color:"#fff"}}  isLoggedIn={props.isLoggedIn} />

        </header>
    );
}

export default MainHeader;