import { InstantSearch } from 'react-instantsearch-hooks-web';
import { Typography, Box } from "@mui/material"

import { searchClient } from '../api/algolia';

import SearchBar from "../components/SearchBar"
import ArticleSearch from '../components/ArticleSearch';
import TitleCard from "../components/TitleCard"

export default function Articles({ mobile }) {

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", width: "100%", padding:2
        }}>
            <TitleCard image={'article.png'} mobile={mobile}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"white"}>Articles</Typography>
            </TitleCard>
            <InstantSearch searchClient={searchClient} indexName="article">
                <SearchBar/>
                <ArticleSearch/>
            </InstantSearch>
            
        </Box>
    )
}