import React from 'react';
import dayjs from 'dayjs';
import LifeCalendar from 'react-lifecalendar'

//? width 52 weeks in a year, height 90 or 90 years -> 0-90 years old

const Life_Calendar = (props) => {
    const [dimensions, setDimensions] = React.useState({ height: 500, width: 500 })
    const [data, setData] = React.useState({
        dob: "02/06/2000",
        lifeExpectancy: 90,
        start: "02/06/2000",
        ranges: [

        ],
        milestones: [

        ]
    });

    React.useEffect(() => {
        setDimensions({
            width: window.innerWidth - 100,
            height: window.innerHeight
        })
    }, [])

    return (
        <LifeCalendar
            width={dimensions.width}
            height={dimensions.height}
            title="Life Calendar"
            data={data}
        />
    );
}

export default Life_Calendar;