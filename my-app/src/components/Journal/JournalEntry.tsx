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
    const [header, setHeader] = React.useState(selected ? selected.toISOString().split("T")[0] : null);
    React.useEffect(() => {
        // ? Get the users entry if there is none allow them to type in the box
        console.log("Selected", selected);
    }, [])
    return (
        <Dialog 
            header={header}
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