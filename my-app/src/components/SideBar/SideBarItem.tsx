import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PrimeReact from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

export interface IProps {
    linkTo: string;
    icon: string;
    label: string;
    min?: boolean;
}

const SideBarItem: React.FC<IProps> = (props: IProps) => {
    const { linkTo, icon, label, min } = props;
    PrimeReact.ripple = true;
    return (
    <NavLink className="sidebar-item ripple-primary p-ripple" to={linkTo}>
        <i className="material-icons">{icon}</i>
        {!min&&<span>{label}</span>}
        <Ripple />
    </NavLink>
    );
}

SideBarItem.defaultProps = {
    min: false
}

export default SideBarItem;