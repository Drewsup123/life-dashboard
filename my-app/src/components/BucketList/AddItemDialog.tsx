import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import firebase from 'firebase';
import { BucketListItemType } from '../../routes/BucketList';
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from 'react-redux';
import { AppState } from '../../store';
const database = firebase.database();

interface IProps {
    open: boolean;
    onHide: any;
    onSave: (newItem: any) => void;
    UID: string;
}

const AddItemDialog: React.FC<IProps> = (props: IProps) => {
    const { open, UID, onSave, onHide } = props;
    const [isSaving, setIsSaving] = React.useState(false);
    const [newItem, setNewItem] = React.useState({
        name: "",
        description: "",
        notes: ""
    } as any);

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSaving(true);
        let key:any = database.ref("/bucket-list/" + UID).push();
        let final: BucketListItemType = {
            ...newItem,
            key: key.key,
            created: Date.now(),
            completed: false,
            expectedCompletion: "",
            // Possible fields to add
            progress: 0,
            // steps: [],
            images: [],
        };
        key.set(final).then((res: any) => {
            console.log(res);
            onSave(final);
        })
        .catch((err: any) => {
            console.log(err);
        })
        .finally(() => setIsSaving(false))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle change", e.target.name, e.target.value)
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Dialog
            header="Add Item"
            visible={open}
            onHide={onHide}
            style={{ width: "50vw", display: "flex", justifyContent: "center" }}
        >
            <div style={{height: 20}} />
            <span className="p-float-label w-100 mb-4">
                <InputText name="name" className="w-100" id="add-item-name-field" value={newItem.name} onChange={handleChange} />
                <label htmlFor="add-item-name-field">Item Name</label>
            </span>
            <span className="p-float-label w-100 mb-4">
                <InputText name="description" className="w-100" id="add-item-description-field" value={newItem.description} onChange={handleChange} />
                <label htmlFor="add-item-description-field">Item Description</label>
            </span>
            <span className="p-float-label w-100 mb-4">
                <InputText name="notes" className="w-100" id="add-item-notes-field" value={newItem.notes} onChange={handleChange} />
                <label htmlFor="add-item-notes-field">Item Notes</label>
            </span>
            <Button disabled={isSaving} onClick={handleSave} className="d-flex align-items-center ml-auto">
                {isSaving 
                ? <ProgressSpinner />
                : <i className="material-icons">save</i>}
                <span>Save Item</span>
            </Button>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(AddItemDialog);
