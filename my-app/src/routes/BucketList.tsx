import React from 'react';
import firebase from 'firebase';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import BucketListItem from '../components/BucketList/BucketListItem';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AddItemDialog from '../components/BucketList/AddItemDialog';
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
    const tableRef: any = React.useRef(null);
    const [items, setItems] = React.useState([] as any);
    const [newItem, setNewItem] = React.useState({ name: "", description: "", notes: "" } as any);
    const [globalFilter, setGlobalFilter] = React.useState(null as any);
    const [addOpen, setAddOpen] = React.useState(false);

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
            <DataTable 
                value={items}
                globalFilter={globalFilter} 
                emptyMessage="No items found."
                rows={Math.floor(window.innerHeight / 50)}
                ref={tableRef}
                header={
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Bucket List</h2>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" placeholder="Search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setGlobalFilter(e.target.value);
                        }}/>
                        <Button onClick={(e: React.SyntheticEvent) => {
                            e.preventDefault();
                            setAddOpen(true);
                        }}>
                            <i className="material-icons">add</i>
                            <span>Add Item</span>
                        </Button>
                    </span>
                </div>
                }
            >
                <Column field="completed" header="" body={formatCompletedCol}></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="description" header="Description"></Column>
                <Column field="notes" header="Notes"></Column>
            </DataTable>
            <AddItemDialog open={addOpen} onHide={() => setAddOpen(false)} />
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);