import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import { Typography, Box } from "@mui/material"

import SearchBar from "../components/SearchBar"
import ArticleSearch from '../components/ArticleSearch';
import TitleCard from "../components/TitleCard"

export default function Articles({ mobile }) {
    const searchClient = algoliasearch('VBRQU0R047', '84b646f50c1b4af83dc8e6ed645e9feb');

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: "center",
            width: "100%", paddingX: "10vw"
        }}>
            <TitleCard image={'yellow.png'} mobile={mobile}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"black"}>Articles</Typography>
            </TitleCard>
            <InstantSearch searchClient={searchClient} indexName="article">
                <SearchBar/>
                <ArticleSearch mobile={mobile}/>
            </InstantSearch>
        </Box>
    )
}