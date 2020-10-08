import React from 'react';
import { Dialog } from 'primereact/dialog';

interface IProps {
    open: boolean;
    onHide: any;
}

const AddItemDialog: React.FC<IProps> = (props: IProps) => {
    return (
        <Dialog
            header="Add Item"
            visible={props.open}
            onHide={props.onHide}
        >
            <div></div>
        </Dialog>
    );
}

export default AddItemDialog;