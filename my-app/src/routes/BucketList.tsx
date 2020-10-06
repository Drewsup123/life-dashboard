import React from 'react';
import firebase from 'firebase';
import { AppState } from '../store';
import { connect } from 'react-redux';
const database = firebase.database();

export interface IProps {
    UID: string;
}

type BucketListItem = {
    name: string;
    description: string;
    notes: string;
    created: string | number;
    completed: boolean;
    expectedCompletion: string | number;
    key: string;
}

const BucketList: React.SFC<IProps> = (props: IProps) => {
    const { UID } = props;
    const [items, setItems] = React.useState([] as any);
    const [newItem, setNewItem] = React.useState({ name: "", description: "", notes: "" });

    const addItem = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let key:any = database.ref("/bucket-list/" + UID).push();
        key.set({
            ...newItem,
            key: key.key,
            created: Date.now(),
            completed: false,
            expectedCompletion: "",
        }).then((res: any) => {
            console.log(res);
            clearNewItem();
        })
        .catch((err: any) => {
            console.log(err);
        })
    }

    const clearNewItem = () => { setNewItem({ name: "", description: "", notes: "" }) }

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
            {Object.keys(newItem).map((key: string) => (
                <input key={key} type="text" name={key} onChange={handleChange} placeholder={key} />
            ))}
            <button onClick={addItem}>Add Item</button>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {items.map((item: BucketListItem, index: number) => <div key={item.key}>{item.name}</div>)}
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);