import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles({
//     root: {
//         "& .MuiTableCell-head":{
//             width: "10%",
//             background: "grey",
//             color: "black",
//             fontWeight: "600"
//         },
//         "& .MuiTableCell-head:last-child":{
//             width: "25%"
//         }
//     }
// });

export default function TableHeading(props){

    const rowHeader = props.header
   // const classes = useStyles()

    return(
        <TableHead >
            <TableRow>
                {
                    rowHeader.map((rowHeader)=>(
                        <TableCell>{rowHeader}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}