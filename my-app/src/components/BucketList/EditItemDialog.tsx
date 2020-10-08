import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export interface IProps {
    original: any;
    onHide: any;
}

const EditItemDialog: React.SFC<IProps> = (props: IProps) => {
    const { original, onHide } = props;
    const [edits, setEdits] = React.useState(original);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    return (
        <Dialog header="Edit Item" visible={original !== null} onHide={onHide}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {
                    edits&&Object.keys(edits).map(key => {
                        if(key === "images" || key === "key"){
                            // ? edge case
                            return null
                        }
                        if(key === "progress"){
                            return(<InputNumber key={key} name={key} value={edits[key]} onValueChange={(e: any) => handleChange(e)} />)
                        }
                        else{
                            return( <InputText key={key} name={key} value={edits[key]} onChange={handleChange} /> )
                        }
                    })
                }
            </div>
        </Dialog>
    );
}

export default EditItemDialog;