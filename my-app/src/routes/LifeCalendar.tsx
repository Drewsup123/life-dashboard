import React from 'react';

export interface IProps {
    dateOfBirth?: any;
}

//? width 52 weeks in a year, height 90 or 90 years -> 0-90 years old

const LifeCalendar: React.FC<IProps> = (props: IProps) => {
    let birthDate = "02/06/2000";
    const [addEventOpen, setAddEventOpen] = React.useState(false);
    const [addGoalOpen, setAddGoalOpen]  = React.useState(false);
    //#region Life Calendar Setup
    let rows: any = [];
    let singleRow = [];
    let header = [];
    for(let i = 0; i <= 52; i++){
        header.push(<div className="life-calendar-header-cell">
            <span>{i}</span>
        </div>)
    }
    for(let i = 0; i <= 52; i++){
        singleRow.push(<div className={`life-calendar-cell life-week-${i}`} key={i}></div>)
    }
    for(let i = 0; i <= 90; i++){
        rows.push(singleRow);
    }
    //#endregion
    return (
        <div>
            <h1>Life calendar</h1>
            <div className="life-calendar-wrapper">
                <span style={{marginLeft: 20}}>Week of the year</span>
                <div className="life-calendar-row" style={{display: "flex"}}>
                    <span style={{width: 20, transform: "rotate(90deg)"}}>
                        YRS
                    </span>
                    {header}
                </div>
                {rows.map((row: any, index: number) =>
                <div style={{display: "flex"}}>
                    <span style={{width: 20}}>{index}:</span>
                    <div key={index} id={`life-year-${index}`} className="life-calendar-row">{row}</div>
                </div>
                )}
            </div>
        </div>
    );
}

export default LifeCalendar;