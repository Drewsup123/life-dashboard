import React from 'react';
import firebase from 'firebase';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import BucketListItem from '../components/BucketList/BucketListItem';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const database = firebase.database();

export interface IProps {
    UID: string;
}

export type BucketListItemType = {
    name: string;
    description: string;
    notes: string;
    created: string | number;
    completed: boolean;
    expectedCompletion: string | number;
    key: string;
}

const BucketList: React.FC<IProps> = (props: IProps) => {
    const { UID } = props;
    const [items, setItems] = React.useState([] as any);
    const [newItem, setNewItem] = React.useState({ name: "", description: "", notes: "" } as any);
    const [globalFilter, setGlobalFilter] = React.useState(null as any);

    const addItem = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let key:any = database.ref("/bucket-list/" + UID).push();
        let final: BucketListItemType = {
            ...newItem,
            key: key.key,
            created: Date.now(),
            completed: false,
            expectedCompletion: "",
            // Possible fields to add
            // progress: "",
            // steps: [],
            // images: [],
        };
        key.set(final).then((res: any) => {
            console.log(res);
            let finalItems: Array<BucketListItemType> = [...items, final];
            setItems(finalItems);
            clearNewItem();
        })
        .catch((err: any) => {
            console.log(err);
        })
    }

    const clearNewItem = () => { setNewItem({ name: "", description: "", notes: "" }); }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }

    const formatCompletedCol = (rowData: BucketListItemType) => (
        <span>
            <i className={`material-icons ${rowData.completed ? "text-success" : "text-danger"}`}>{rowData.completed ? "check_circle" : "cancel"}</i>
        </span>
    );

    React.useEffect(() => {
        database.ref("/bucket-list/" + UID).once("value")
        .then(res => {
            const snapshot = res.val();
            console.log("SnapShot", snapshot);
            setItems(Object.values(snapshot));
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div style={{ padding: "0 20px" }}>
            <h1 className="w-100 text-center">Bucket List</h1>
            <DataTable 
                value={items}
                globalFilter={globalFilter} 
                emptyMessage="No items found."
                rows={Math.floor(window.innerHeight / 50)}
                header={
                <div className="d-flex justify-content-end align-items-center">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" placeholder="Search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setGlobalFilter(e.target.value);
                        }}/>
                    </span>
                </div>
                }
            >
                <Column field="completed" header="" body={formatCompletedCol}></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="description" header="Description"></Column>
                <Column field="notes" header="Notes"></Column>
            </DataTable>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);