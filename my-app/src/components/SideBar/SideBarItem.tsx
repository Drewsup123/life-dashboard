import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PrimeReact from 'primereact/utils';
import { Ripple } from 'primereact/ripple';

export interface IProps {
    linkTo: string;
    icon: string;
    label: string;
}

const SideBarItem: React.FC<IProps> = (props: IProps) => {
    const { linkTo, icon, label } = props;
    PrimeReact.ripple = true;
    return (
    <NavLink className="sidebar-item ripple-primary p-ripple" to={linkTo}>
        <i className="material-icons">{icon}</i>
        <span>{label}</span>
        <Ripple />
    </NavLink>
    );
}

export default SideBarItem;