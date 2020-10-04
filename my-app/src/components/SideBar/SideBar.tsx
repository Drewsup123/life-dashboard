import * as React from 'react';
import { Sidebar } from 'primereact/sidebar';
import PrimeReact from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import SideBarItem from './SideBarItem';
import { connect } from 'react-redux';
import { toggleSideBar } from '../../store/application/actions';
import './SideBar.css';
import { AppState } from '../../store';
import routes from './SideBarItems';

export interface IProps {
    open: boolean;
    toggleSideBar: any;
}

type RouteItem = {
    linkTo: string;
    icon: string;
    label: string;
}

const SideBar: React.FC<IProps> = (props: IProps) => {
    const { open } = props;
    PrimeReact.ripple = true;

    const hideMenu = () => { props.toggleSideBar() }

    return (
        <Sidebar className="sidebar" visible={open} position="left" onHide={hideMenu}>
            <div className="sidebar-content">
                {routes.map((route: RouteItem, index: number) => <SideBarItem key={index} id={index} label={route.label} linkTo={route.linkTo} icon={route.icon} />)}
            </div>
            <div className="sidebar-footer">
                <SideBarItem id="profile-link-full" label="Profile" icon="account_circle" linkTo="/profile" />
                <div className="sidebar-item p-ripple ripple-danger">
                    <i className="material-icons">logout</i>
                    <span>Logout</span>
                    <Ripple />
                </div>
            </div>
        </Sidebar>
    );
}

const mapStateToProps = (state: AppState) => ({
    open: state.applicationReducer.sideBarOpen,
})

export default connect(mapStateToProps, { toggleSideBar })(SideBar);