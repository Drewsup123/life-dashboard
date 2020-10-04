import React from 'react';
import routes, {RouteItem} from './SideBarItems';
import { toggleSideBar } from '../../store/application/actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SideBarMin.css';
import { AppState } from '../../store';

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
                <i onClick={handleToggle} className="material-icons">home</i>
            </div>
            {routes.map((route: RouteItem, index: number) => (
                <NavLink key={index} to={route.linkTo} className="sidebar-min-item">
                    <i className="material-icons">{route.icon}</i>
                </NavLink>
            ))}
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({  });

export default connect(mapStateToProps, { toggleSideBar })(SideBarMin);