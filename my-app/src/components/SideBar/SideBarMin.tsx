import React from 'react';
import routes, {RouteItem} from './SideBarItems';
import { toggleSideBar } from '../../store/application/actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SideBarMin.css';
import { AppState } from '../../store';
import { Ripple } from 'primereact/ripple';
import SideBarItem from './SideBarItem';

export interface IProps {
    toggleSideBar: any;
}

const SideBarMin: React.FC<IProps> = (props: IProps) => {
    const handleToggle = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.toggleSideBar();
    }
    return (
        <div className="sidebar-min">
            <div className="sidebar-min-item">
                <i onClick={handleToggle} className="material-icons">menu_open</i>
            </div>
            {routes.map((route: RouteItem, index: number) => (
                <SideBarItem key={index} icon={route.icon} linkTo={route.linkTo} label={route.label} min/>
            ))}
            <div style={{marginTop: "auto"}}>
                <SideBarItem icon="account_circle" linkTo="/profile" label="Profile" min />
                <div className="sidebar-item p-ripple ripple-danger">
                    <i className="material-icons">logout</i>
                    <Ripple />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({  });

export default connect(mapStateToProps, { toggleSideBar })(SideBarMin);