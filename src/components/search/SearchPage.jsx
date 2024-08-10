import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { GET_SEARCHED_POSTS } from '../../graphql/queries';
import Loader from '../shared/Loader';
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography, CardMedia, TextField, Button } from '@mui/material';
import HorizontalCardElem from '../shared/HorizontalCardElem';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchPage() {

    const [searchValue, setSearchValue] = useState([])

    const [searchParam, setSearchParam] = useSearchParams();
    const searchQuery = searchParam.get("q")

    const { loading, data, error } = useQuery(GET_SEARCHED_POSTS, {
        variables: { title_contains: searchQuery }
    });

    if (loading) return <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "60vh" }}><Loader /></Box>

    if (error) return <h1>مشکلی پیش آمد</h1>

    
    const searchHandler = () => {
        setSearchParam({ q: searchValue })
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
            {
                (!data.posts || !data.posts.length) ? <h1>پستی با همچین عنوانی پیدا نشد.</h1> : (
                    <Grid container mt={5}>
                        <Box component="div">
                            <Typography component="h3" variant="h6" fontWeight={400}>
                                مقاله های پیدا شده:
                            </Typography>
                        </Box>
                        <Grid container>
                            {data && data.posts && data?.posts.map((post) => (
                                <HorizontalCardElem key={post.id} post={post} />
                            ))}
                        </Grid>
                    </Grid>
                )

            }

        </Container>


    )
}

export default SearchPage