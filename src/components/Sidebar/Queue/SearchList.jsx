import {useState} from 'react';
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

import '../../../css/Queue.css'

const SearchList = ({searchResults, closeSearch}) => {
    
    return (
        <div> 
            <div className="list">
                <Table>
                    <TableBody>
                        {
                            searchResults.map((item) =>
                                <TableRow>
                                    <TableCell className="table-cell">
                                        <QueueItem
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