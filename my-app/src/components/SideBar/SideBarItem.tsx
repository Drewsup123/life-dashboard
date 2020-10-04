import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PrimeReact from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import ReactTooltip from 'react-tooltip';

export interface IProps {
    linkTo: string;
    icon: string;
    label: string;
    min?: boolean;
    id: string | number;
}

const SideBarItem: React.FC<IProps> = (props: IProps) => {
    const { linkTo, icon, label, min, id } = props;
    PrimeReact.ripple = true;
    return (
    <React.Fragment>
        <NavLink 
            data-tip 
            data-for={`sidebar-tooltip-${id}`} 
            className="sidebar-item ripple-primary p-ripple" 
            to={linkTo}
        >
            <i className="material-icons">{icon}</i>
            {!min&&<span>{label}</span>}
            <Ripple />
        </NavLink>
        {
            min&&(
            <ReactTooltip arrowColor="transparent" place="right" effect="solid" id={`sidebar-tooltip-${id}`}>
                <span style={{fontSize: 20}}>{label}</span>
            </ReactTooltip>
            )
        }
    </React.Fragment>
    );
}

SideBarItem.defaultProps = {
    min: false
}

export default SideBarItem;