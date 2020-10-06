export interface RouteItem {
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
    },
    {
        linkTo: "life-calendar",
        label: "Life Calendar",
        icon: "date_range"
    },
    {
        linkTo: "journal",
        label: "Journal/Mood Tracker",
        icon: "mood"
    }
];

export default routes;