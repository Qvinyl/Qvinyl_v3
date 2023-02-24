import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

import '../../../css/Queue.css'

const ContentSearch = ({searchTerm, closeSearch}) => {
    const searchList = [
                // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Another Day of Sun",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Someone in the crowd",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Mia and Sebastian's Theme",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "A Lovely Night",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Herman's Habit",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "City of Stars",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Planetarium",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Summer Montage/ Madeline",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: `City Of Stars (From "La La Land" Soundtrack)`,
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Start a fire",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Engagement Party",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Audition",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "Epilogue",
        //     queuedBy: "Josh Cheung"
        // },
        // {
        //     thumbnail: "https://i.ytimg.com/vi/GTWqwSNQCcg/hq720.jpg",
        //     title: "The End",
        //     queuedBy: "Josh Cheung"
        // }
    ]

    return (
        <div> 
            <div className="list">
                <Table>
                    <TableBody>
                        {
                            searchList.map((item) =>
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
export default ContentSearch;