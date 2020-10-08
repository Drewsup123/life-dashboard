import React from 'react';
import firebase from 'firebase';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import BucketListItem from '../components/BucketList/BucketListItem';
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
            // steps: []
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
        <div>
            <h1>Bucket List</h1>
            <div className="col-12 col-md-12">
            {Object.keys(newItem).map((key: string) => (
                <InputText className="col-12 col-md-3" key={key} type="text" name={key} value={newItem[key]} onChange={handleChange} placeholder={key} />
            ))}
            <Button className="col-3" label="Add Item" onClick={addItem} />
            </div>
            {/* <button onClick={addItem}>Add Item</button> */}
            <div className="bucket-list-container">
                <div className="bucket-list-list-header">
                    <span>Name</span>
                    <span>Description</span>
                    <span>Created On</span>
                    <span>Completed</span>
                    <span>Notes</span>
                </div>
                {items.map((item: BucketListItemType, index: number) => (
                    <BucketListItem {...item} />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);