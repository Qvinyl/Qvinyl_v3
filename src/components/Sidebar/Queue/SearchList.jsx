import React from 'react';
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import '../../../css/Queue.css'

const SearchList = ({searchResults, closeSearch, displayName, currentRoomkey}) => {
    const queue = useSelector((state) => state.queueReducer.queue);
    
    return (
        <div> 
            <div className="list">
                <Table>
                    <TableBody>
                        {
                            searchResults.map((item, index) =>
                                <TableRow
                                    className="table-row"
                                    key={index}>
                                    <TableCell className="table-cell">
                                        <QueueItem
                                            queue={queue}
                                            currentRoomkey={currentRoomkey}
                                            displayName={displayName}
                                            url={item.url}
                                            thumbnail={item.thumbnail}
                                            title={item.title}
                                            wasPlayed={false}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <Button 
                onClick={() => closeSearch(false)}
                variant="contained" 
                className="close-button"> Close Search 
            </Button>
        </div>
    )
}
export default SearchList;