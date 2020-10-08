import React from 'react';
import { Dialog } from 'primereact/dialog';

export interface IProps {
    id: string | null;
    original: any;
}

const EditItemDialog: React.SFC<IProps> = (props: IProps) => {
    const { id, original } = props;
    const [edits, setEdits] = React.useState(original);
    return (
        <Dialog visible={id !== null} onHide={() => null}>
            <div>

            </div>
        </Dialog>
    );
}

export default EditItemDialog;