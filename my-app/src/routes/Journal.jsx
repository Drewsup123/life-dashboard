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
    const [selected, setSelected] = React.useState(new Date());

    const handleSelect = date => {
        setSelected(new Date(date));
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
            height={window.innerHeight - 50}
            rowHeight={window.innerHeight / 7}
            min={new Date(2020, 1, 1)}
            max={new Date()}
            selected={selected}
            onSelect={handleSelect}
        />
        <JournalEntry key={selected} selected={selected} open={selected !== null} onHide={closeEntryModal} />
        </>
    );
}

export default Journal;