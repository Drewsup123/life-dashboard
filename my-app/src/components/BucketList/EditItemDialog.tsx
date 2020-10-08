import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';

export interface IProps {
    original: any;
    onHide: any;
}

const EditItemDialog: React.SFC<IProps> = (props: IProps) => {
    const { original, onHide } = props;
    const [edits, setEdits] = React.useState(original);

    const handleChange = (e: any, type: string = "input") => {
        e.target&&e.preventDefault();
        console.log(e, type, edits);
        if(type === "input" && e.target){
            setEdits({ ...edits, [e?.target.name]: e?.target.value })
        }else if(type === "slider"){
            setEdits({ ...edits, progress: e.value })
        }
    }



    return (
        <Dialog style={{ width: "50vw" }} header="Edit Item" visible={original !== null} onHide={onHide}>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {
                    edits&&Object.keys(edits).map(key => {
                        if(key === "images" || key === "key"){
                            // ? edge case
                            return null
                        }
                        if(key === "progress"){
                            return <Slider className="w-100" min={0} max={100} key={key} value={edits[key]} onChange={(e: any) => handleChange(e, "slider")} range />
                            // return(<InputNumber className="w-100 mb-3" key={key} name={key} value={edits[key]} onValueChange={(e: any) => handleChange(e)} />)
                        }
                        else{
                            return( <InputText className="w-100 mb-3" key={key} name={key} value={edits[key]} onChange={handleChange} /> )
                        }
                    })
                }
            </div>
        </Dialog>
    );
}

export default EditItemDialog;