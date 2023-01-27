import { InstantSearch } from 'react-instantsearch-hooks-web';
import { Typography, Box } from "@mui/material"
import { searchClient } from '../api/algolia';

import SearchBar from "../components/SearchBar"
import ArticleSearch from '../components/ArticleSearch';
import TitleCard from "../components/TitleCard"
import Head from 'next/head';

export default function articles() {

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", width: "100%", padding: 2
        }}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="articles|clementc.dev" />
                <meta property="og:description" content="articles by clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Farticle.png?alt=media&token=c9a8cac7-8aba-47f8-b696-675b20025b78" />
                <meta property="og:url" content="https://clementc.dev/articles" />
                <title>articles|clementc.dev</title>
            </Head>
            <TitleCard image={'article.png'}>
                <Typography variant={"h2"} color={"white"}>articles</Typography>
            </TitleCard>
            <InstantSearch searchClient={searchClient} indexName="article">
                <SearchBar />
                <ArticleSearch />
            </InstantSearch>

        </Box>
    )
}