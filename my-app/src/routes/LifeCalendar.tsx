import React from 'react';

export interface IProps {
    dateOfBirth?: any;
}

//? width 52 weeks height 89 -> 0-90 years old

const LifeCalendar: React.FC<IProps> = (props: IProps) => {
    let rows: any = [];
    let singleRow = [];
    let header = [];
    for(let i = 0; i <= 52; i++){
        header.push(<div className="life-calendar-header life-calendar-cell">
            <span>{i}</span>
            <div className={`life-calendar-cell life-week-header-${i}`} key={i}></div>
        </div>)
    }
    for(let i = 0; i <= 52; i++){
        singleRow.push(<div className={`life-calendar-cell life-week-${i}`} key={i}></div>)
    }
    for(let i = 0; i <= 90; i++){
        rows.push(singleRow);
    }
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