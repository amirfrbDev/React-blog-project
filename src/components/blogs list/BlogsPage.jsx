import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {  GET_TEN_POSTS_PER_PAGE } from '../../graphql/queries'
import { Box, Container, Grid, Typography, Button, TextField } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HorizontalCardElem from "../shared/HorizontalCardElem"
import Loader from '../shared/Loader';



function BlogsPage() {

    const [page, setPage] = useState(3)
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate()

    const { loading, data, error } = useQuery(GET_TEN_POSTS_PER_PAGE, {
        variables: { first: 5, skip: 5 * (page - 1) }
    });

    if (loading) return <Box component="div" display="flex" justifyContent="center" alignItems="center" height="70vh"><Loader /></Box>

    const postsCount = data?.postsConnection?.aggregate.count;
    const totalPages = Math.ceil(postsCount / 5);

    const searchHandler = () => {
        navigate(`/search?q=${searchValue}`)
    }

    return (

        <Container maxWidth="lg">
            <Box component="div" mt={3}>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Grid item xs={10} sm={8} md={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label="جستجو"
                                    size="small"
                                    onChange={e => setSearchValue(e.target.value)}
                                    value={searchValue}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ height: "100%", width: "100%" }}
                                    onClick={searchHandler}
                                >
                                    <SearchRoundedIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid container mt={5}>
                <Box component="div">
                    <Typography component="h3" variant='h5'>لیست همه‌ی مقالات :</Typography>
                </Box>
                <Grid container>
                    {data.posts.map((post) => <HorizontalCardElem key={post.id} post={post} />)}
                </Grid>
            </Grid>
            <Grid item display="flex" justifyContent='center' alignItems="center" mt={5}>
                <Button variant='contained' sx={{ minWidth: "1px", p: 0.5 }} disabled={page === totalPages} onClick={() => setPage(page => page + 1)}>
                    <ArrowRightRoundedIcon />
                </Button>
                <Typography component="p" variant='h6' mx={1} sx={{ backgroundColor: "#e2e2e2", width: "30px", textAlign: "center", borderRadius: "5px", boxShadow: "rgba(0,0,0,0.1) 0 4px 12px" }}>{page}</Typography>
                <Button variant='contained' sx={{ minWidth: "1px", p: 0.5 }} disabled={page === 1} onClick={() => setPage(page => page - 1)} >
                    <ArrowLeftRoundedIcon />
                </Button>

            </Grid>

        </Container>
    )
}

export default BlogsPage