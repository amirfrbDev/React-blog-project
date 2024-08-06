import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router'
import { GET_AUTHOR } from '../../graphql/queries';
import {  Avatar, Container, Grid, Typography } from '@mui/material';
import sanitizeHtml from 'sanitize-html';
import CardElem from '../shared/CardElem';
import Loader from '../shared/Loader';

function AuthorPage() {

    const { slug } = useParams();

    const { loading, data, error } = useQuery(GET_AUTHOR, {
        variables: { slug }
    });

    if (loading) return (
        <div style={{ width: "100%", height: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loader />
        </div>
    )

    if (error) return <h2>مشکلی پیش اومده! دوباره امتحان کنین:)</h2>

    const { author: { name, field, avatar, description, post } } = data;

    return (
        <Container maxWidth="lg">
            <Grid container mt={10}>
                <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={avatar?.url} sx={{ width: 250, height: 250 }} />
                    <Typography component="h3" variant="h4" fontWeight={700} mt={4}>{name}</Typography>
                    <Typography component="p" variant='h5' color="text-secondary" mt={2}>{field}</Typography>
                </Grid>
                <Grid item xs={12} mt={5}>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description.html) }} style={{ textAlign: "justify" }}></div>
                </Grid>
                <Grid item xs={12} mt={6}>
                    <Typography component="h3" variant="h5" fontWeight={700}>مقالات {name}</Typography>
                    <Grid container spacing={2} mt={2}>
                        {post.map(post => (
                            <Grid item key={post.id} xs={12} sm={6} md={4} mt={1}>
                                <CardElem title={post.title} slug={post.slug} coverPhoto={post.coverPhoto} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AuthorPage