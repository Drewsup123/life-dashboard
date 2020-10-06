import React from 'react';
import dayjs from 'dayjs';
import { withHighlightedDates } from '../components/Journal/WithHighlighted';
import InfiniteCalendar, { 
    Calendar, 
    withDateSelection, 
    withKeyboardSupport } 
from "react-infinite-calendar";
import 'react-infinite-calendar/styles.css';
import JournalEntry from '../components/Journal/JournalEntry';

const Journal = () => {
    const [dates, setDates] = React.useState(["2020-10-07"]);
    const [userEntries, setUserEntries] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const handleSelect = date => {
        console.log(date);
        let id = dayjs(date).valueOf();
        setSelected(id);
    }

    const closeEntryModal = () => {
        setSelected(null);
    }

    return (
        <>
        <InfiniteCalendar
            Component={withDateSelection(withHighlightedDates(Calendar))}
            highlighted={dates}
            displayOptions={{
                layout: 'landscape'
            }}
            width={"100%"}
            height={"100vh"}
            rowHeight={window.innerHeight / 7}
            min={new Date(2020, 9, 5)}
            selected={new Date()}
            onSelect={handleSelect}
        />
        <JournalEntry selected={selected} open={selected !== null} onHide={closeEntryModal} />
        </>
    );
}

export default Journal;