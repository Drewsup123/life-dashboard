import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { InputSwitch } from 'primereact/inputswitch';

export interface IProps {
    original: any;
    onHide: any;
}

const EditItemDialog: React.SFC<IProps> = (props: IProps) => {
    const { original, onHide } = props;
    const [edits, setEdits] = React.useState(original);

    const handleChange = (e: any) => {
        e.target&&e.preventDefault();
        setEdits({ ...edits, [e?.target.name]: e?.target.value });
    }

    const handleProgressChange = (e: any) => { 
        setEdits({ ...edits, progress: e.value, completed: e.value === 100 ? true : original.completed }); 
    }

    const toggleCompleted = (e: any) => { setEdits({ ...edits, completed: !edits.completed }) }

    return (
        <Dialog style={{ width: "50vw" }} header="Edit Item" visible={original !== null} onHide={onHide}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="d-flex flex-column mt-4 w-100">
                    <label htmlFor="completed-input">Completed</label>
                    <InputSwitch onChange={toggleCompleted} checked={edits.completed} id="completed-input" />
                </span>
                <span className="p-float-label mt-4 w-100">
                    <InputText className="w-75" id="name-input" name="name" onChange={handleChange} value={edits.name} />
                    <label htmlFor="email-input">Name</label>
                </span>
                <span className="p-float-label mt-4 w-100">
                    <InputText className="w-75" id="description-input" name="description" onChange={handleChange} value={edits.description} />
                    <label htmlFor="description-input">Description</label>
                </span>
                <span className="p-float-label mt-4 w-100">
                    <InputText className="w-75" id="created-input" name="created" onChange={handleChange} value={edits.created} />
                    <label htmlFor="created-input">Created</label>
                </span>
                <span className="mt-4 w-100 d-flex flex-column">
                    <label htmlFor="progress-input">Progress: {edits.progress}</label>
                    <Slider id="progress-input" className="w-100" min={0} max={100} value={edits.progress} onChange={handleProgressChange} />
                </span>
            </div>
        </Dialog>
    );
}

export default EditItemDialog;