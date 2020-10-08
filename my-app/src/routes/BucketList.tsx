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
import { ProgressSpinner } from 'primereact/progressspinner';
import EditItemDialog from '../components/BucketList/EditItemDialog';
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
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([] as any);
    const [globalFilter, setGlobalFilter] = React.useState(null as any);
    const [addOpen, setAddOpen] = React.useState(false);
    const [toEdit, setToEdit] = React.useState(null as any);

    const handleAdd = (newItem: BucketListItemType) => { setItems([...items, newItem]); setAddOpen(false); }

    const toggleEdit = (key: string | null) => {
        if(key === null){ setToEdit(null); return; }
        let found: any = items.findIndex((item: any) => item.key === key);
        if(found >= 0){ setToEdit(items[found]); }
    }

    const formatCompletedCol = (rowData: BucketListItemType) => (<span>
            <i className={`material-icons ${rowData.completed ? "text-success" : "text-danger"}`}>{rowData.completed ? "check_circle" : "cancel"}</i>
        </span>);

    const renderActions = (rowData: BucketListItemType) => <div>
        <Button onClick={(e: React.SyntheticEvent) => toggleEdit(rowData.key)} className="d-flex justify-content-between align-items-center ml-auto">
            <i className="material-icons">edit</i>
            <span>Edit</span>
        </Button>
    </div>

    React.useEffect(() => {
        setLoading(true);
        database.ref("/bucket-list/" + UID).once("value")
        .then(res => {
            const snapshot = res.val();
            console.log("SnapShot", snapshot);
            setItems(Object.values(snapshot));
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <div style={{ padding: "0 20px" }}>
            {
                loading
                ?<div className="d-flex justify-content-center align-items-center"><ProgressSpinner /></div>
                :
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
                    <Column style={{width: 50}} field="completed" header="" body={formatCompletedCol}></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="notes" header="Notes"></Column>
                    <Column field="actions" header="" body={renderActions}></Column>
                </DataTable>
            }
            <AddItemDialog onSave={handleAdd} open={addOpen} onHide={() => setAddOpen(false)} />
            <EditItemDialog onHide={() => toggleEdit(null)} original={toEdit} />
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);