import {useRef, useEffect, useState} from 'react';

import SearchList from './SearchList';
import PlaylistQueue from './PlaylistQueue';
import FormControl from '@mui/material/FormControl';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import LinearProgress from '@mui/material/LinearProgress';
import {searchYouTube} from '../../../features/queue/YoutubeSearch';

import '../../../css/Queue.css'

const Queue = () => {
   
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        setSearchInput("");
    };

    const setSeachInput = (event) => {
        const newValue = event.target.value;
        setSearchInput(newValue);
    }

    const keyPress = (e) => {
        if(e.keyCode === 13){
           handleSubmit(e);
           searchContent(searchTerm)
        }
    }

    const searchContent = async (searchTerm) => {
        searchYouTube(searchTerm).then(results => {
            setLoading(true)
            if (results) {
                setLoading(false)
                setSearching(true)
            }
            setSearchResults(results);
        })
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
                <SearchList
                    searchResults={searchResults}
                    closeSearch={closeSearch}
                />
            </div>
            {
                loading && <LinearProgress/>
            }
            <div className="input-field send">
                <FormControl onSubmit={handleSubmit}>
                    <RoundedInputField 
                        value={searchTerm}
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
