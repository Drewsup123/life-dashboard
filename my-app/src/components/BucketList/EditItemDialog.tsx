import React from 'react';
import { Dialog } from 'primereact/dialog';

export interface IProps {
    original: any;
    onHide: any;
}

const EditItemDialog: React.SFC<IProps> = (props: IProps) => {
    const { original, onHide } = props;
    const [edits, setEdits] = React.useState(original);
    return (
        <Dialog visible={original !== null} onHide={onHide}>
            <div>

            </div>
        </Dialog>
    );
}

export default EditItemDialog;