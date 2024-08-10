import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_BLOGS_INFO } from '../../graphql/queries'
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography, CardMedia } from '@mui/material';
import { convertDate } from '../../helpers/dateConverter';
import { convertTime } from '../../helpers/timeConverter';
import { Link } from 'react-router-dom';

import HorizontalCardElem from "../shared/HorizontalCardElem"



function BlogsPage() {

    const { loading, data, error } = useQuery(GET_BLOGS_INFO);
    console.log(data);

    if (loading) return <h2>Loading...</h2>




    return (
        <Container maxWidth="lg">
            <Grid container mt={5}>
                <Box component="div">
                    <Typography component="h3" variant='h5'>لیست همه‌ی مقالات :</Typography>
                </Box>
                <Grid container>
                    {data.posts.map((post) => <HorizontalCardElem key={post.id} post={post} />)}
                </Grid>
            </Grid>
        </Container>
    )
}

export default BlogsPage