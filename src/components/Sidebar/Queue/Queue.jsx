import {useRef, useEffect, useState} from 'react';

import ContentSearch from './ContentSearch';
import PlaylistQueue from './PlaylistQueue';
import FormControl from '@mui/material/FormControl';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import '../../../css/Queue.css'

const Queue = () => {
   
    const [searching, setSearching] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearching(true)
    };

    const setSeachInput = (event) => {
        const newValue = event.target.value;
        setSearchInput({ searchTerm: newValue });
        console.log(searchInput);
    }

    const keyPress = (e) => {
        if(e.keyCode === 13){
           console.log(e.target.value);
           handleSubmit(e);
        }
    }

    const closeSearch = (isSearching) => {
        setSearching(isSearching);
    }

    return (
        <div className="content-container queue">
            <div className={searching ? "playlist-close" : "playlist-open"}>
                <PlaylistQueue/>
            </div>
            <div className={searching ? "search-list-container" : "search-list-container-closed"}>
                <ContentSearch
                    closeSearch={closeSearch}
                />
            </div>
            <div className="input-field send">
                <FormControl onSubmit={handleSubmit}>
                    <RoundedInputField 
                        onKeyDown={keyPress}
                        onChange={setSeachInput}
                        searchedTerm="searchedTerm" 
                        type="text"
                        inputRef={inputReference}
                        label="Search/Paste from Youtube" 
                        multiline maxRows={4}
                        />
                </FormControl>
            </div>
        </div>
    )
}

export default Queue;
