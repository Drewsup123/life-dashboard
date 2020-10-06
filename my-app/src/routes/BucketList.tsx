import React from 'react';
import firebase from 'firebase';
import { AppState } from '../store';
import { connect } from 'react-redux';
const database = firebase.database();
export interface IProps {
    UID: string;
}

const BucketList: React.SFC<IProps> = (props: IProps) => {
    const { UID } = props;

    const addItem = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let key:any = database.ref("/bucket-list/" + UID).push();
        key.set({
            name: "Go Sky Diving",
            created: Date.now(),
            completed: false,
            expectedCompletion: "",
        }).then((res: any) => {
            console.log(res);
        })
        .catch((err: any) => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        database.ref("/bucket-list/" + UID).once("value")
        .then(res => {
            const snapshot = res.val();
            console.log("SnapShot", snapshot);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            <h1>Bucket List</h1>
            <input type="text" placeholder="Add An Item" />
            <button onClick={addItem}>Add Item</button>
            {/* // ? Render input at the top to add bucket list item
            // ? Render list below with bucket list items
            // ? Mark as completed show added date, expected completion time, editing, good list animation 
            */}
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    UID: state.User.UID
});

export default connect(mapStateToProps)(BucketList);