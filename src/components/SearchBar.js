import { IconButton, TextField } from "@mui/material";
import { useSearchBox } from 'react-instantsearch-hooks-web';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

export default function SearchBar(props) {
    const { refine } = useSearchBox(props);
    const [text, setText] = useState("")

    useEffect(() => {
        refine(text)
    }, [text, refine])

    return (
        <TextField label="Search in Articles" variant="outlined" value={text}
            sx={{ width: "80%", marginY: 2, '& fieldset': { borderRadius: 4 } }}
            onChange={(event) => { setText(event.target.value) }} InputProps={
                (text.length!==0)?
                {endAdornment:
                    <IconButton onClick={()=>{setText("")}}>
                        <CloseIcon />
                    </IconButton>
                }:{}
        } />
    )
}