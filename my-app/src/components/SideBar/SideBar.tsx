import * as React from 'react';
import { Sidebar } from 'primereact/sidebar';
import PrimeReact from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import './SideBar.css';
import SideBarItem from './SideBarItem';

export interface IProps {
    
}

type RouteItem = {
    linkTo: string;
    icon: string;
    label: string;
}

const routes: Array<RouteItem> = [
    {
        linkTo: "/overview",
        label: "Overview",
        icon: "dashboard"
    },
    {
        linkTo: "/finance",
        label: "Finance",
        icon: "attach_money"
    },
    {
        linkTo: "bucket-list",
        label: "Bucket List",
        icon: "list_alt"
    },
    {
        linkTo: "/notes",
        label: "Notes",
        icon: "note"
    },
    {
        linkTo: "/schedule",
        label: "Schedule",
        icon: "schedule"
    },
    {
        linkTo: "reminders",
        label: "Reminders",
        icon: "notifications_active"
    },
    {
        linkTo: "/todo",
        label: "Todo",
        icon: "format_list_numbered"
    },
    {
        linkTo: "/subscription",
        label: "Subscription",
        icon: "card_membership"
    },
    {
        linkTo: "/dream-journal",
        label: "Dream Journal",
        icon: "online_prediction"
    }
]

const SideBar: React.FC<IProps> = () => {
    PrimeReact.ripple = true;
    return (
        <Sidebar className="sidebar" visible={true} position="left" onHide={() => null}>
            <div className="sidebar-content">
                {routes.map((route: RouteItem) => <SideBarItem label={route.label} linkTo={route.linkTo} icon={route.icon} />)}
            </div>
            <div className="sidebar-footer">
                <SideBarItem label="Profile" icon="account_circle" linkTo="/profile" />
                <div className="sidebar-item p-ripple ripple-danger">
                    <i className="material-icons">logout</i>
                    <span>Logout</span>
                    <Ripple />
                </div>
            </div>
        </Sidebar>
    );
}

export default SideBar;