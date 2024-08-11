import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { GET_LAST_N_POSTS, GET_SEARCHED_POSTS } from '../../graphql/queries';
import Loader from '../shared/Loader';
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography, CardMedia, TextField, Button } from '@mui/material';
import HorizontalCardElem from '../shared/HorizontalCardElem';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchPage() {

    const [searchValue, setSearchValue] = useState("");


    const [searchParam, setSearchParam] = useSearchParams();
    const searchQuery = searchParam.get("q");

    const [showSearchedPosts, setShowSearchedPosts] = useState(searchQuery ? true : false)

    const { loading: loadingLastPosts, data: lastPostsData, error: lastPostsError } = useQuery(GET_LAST_N_POSTS, {
        skip: !!searchQuery
    });
    console.log({ loadingLastPosts, lastPostsData, lastPostsError })


    const [getSearchedPosts, { loading, data, error }] = useLazyQuery(GET_SEARCHED_POSTS);


    useEffect(() => {
        if (searchQuery) {
            getSearchedPosts({ variables: { tags_contains: searchQuery } });
            setShowSearchedPosts(true)
        } else {
            setShowSearchedPosts(false)
        }
    }, [searchQuery, getSearchedPosts]);

    if (error || lastPostsError) return <h1>مشکلی پیش آمد</h1>


    const searchHandler = () => {
        setSearchParam({ q: searchValue })
        return null;
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
                (loading || loadingLastPosts) &&
                <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "60vh" }}>
                    <Loader />
                </Box>
            }

            {
                (searchQuery && !loading && (!data?.posts || !data?.posts.length)) && <h1>پستی با همچین عنوانی پیدا نشد.</h1>
            }

            {
                showSearchedPosts && !loading && data?.posts.length &&
                <Grid container mt={5}>
                    <Box component="div">
                        <Typography component="h3" variant="h6" fontWeight={400}>
                            مقاله های پیدا شده:
                        </Typography>
                    </Box>
                    <Grid container>
                        {
                            data && data.posts && data?.posts.map((post) => (
                                <HorizontalCardElem key={post.id} post={post} />
                            ))
                        }
                    </Grid>
                </Grid>
            }


            {
                !showSearchedPosts && !searchQuery && !lastPostsError && lastPostsData?.posts && (
                    <Grid container mt={5}>
                        <Box component="div">
                            <Typography component="h3" variant="h6" fontWeight={400}>
                                مقاله های اخیر:
                            </Typography>
                        </Box>
                        <Grid container>
                            {
                                lastPostsData && lastPostsData.posts && lastPostsData?.posts.map((post) => (
                                    <HorizontalCardElem key={post.id} post={post} />
                                ))
                            }
                        </Grid>
                    </Grid>
                )
            }

        </Container>


    )
}

export default SearchPage