import React from 'react';
import dayjs from 'dayjs'
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';

export interface IProps {
    open: boolean;
    onHide: any;
    selected: any;
}

const JournalEntry: React.FC<IProps> = (props: IProps) => {
    const { open, onHide, selected } = props;
    React.useEffect(() => {
        // ? Get the users entry if there is none allow them to type in the box
    }, [])
    return (
        <Dialog 
            header={dayjs(selected).format("MM-DD-YYYY")}
            visible={open} 
            maximizable 
            modal 
            style={{ width: '80vw', minHeight: '80vh' }} 
            onHide={() => onHide()}
        >
            <Editor 
                style={{ height: "calc(80vh - 160px)", width: "100%" }}
            />
        </Dialog>
    );
}

export default JournalEntry;