import { useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { GET_POST } from '../../graphql/queries';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import Loader from '../shared/Loader';
import { ArrowBackRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import CommentForm from '../comment/CommentForm';
import Comments from '../comment/Comments';
import { tagExtractor } from '../../helpers/tagsExtractor';


function BlogPage() {

    const { slug } = useParams();

    const navigate = useNavigate();


    const { loading, data, error } = useQuery(GET_POST, {
        variables: { slug }
    })

    console.log(data)

    if (loading) return (
        <div style={{ width: "100%", height: "65vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loader />
        </div>
    )

    if (error) return <h2>مشکلی پیش اومده! دوباره امتحان کنین:)</h2>

    const tags = tagExtractor(data.post.tags);
    let x = [];
    for (let index = 0; index < 15; index++) {
        x.push(index)
    }
    console.log(x)

    return (
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={12} mt={9} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography component="h2" variant='h4' color="primary" fontWeight={700}>
                        {data.post.title}
                    </Typography>
                    <ArrowBackRounded onClick={() => navigate(-1)} style={{ cursor: "pointer", fontSize: "2rem" }} />
                </Grid>
                <Grid item xs={12} mt={6}>
                    <img src={data.post.coverPhoto.url} alt={data.post.slug} width="100%" style={{ borderRadius: 15 }} />
                </Grid>
                <Grid item xs={12} mt={7} display="flex" alignItems="center">
                    <Link to={`/authors/${data.post.author.slug}`} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
                        <Avatar
                            src={data.post.author.avatar.url}
                            sx={{ width: 80, height: 80, marginLeft: 2 }}
                        />
                    </Link>
                    <Box component="div">
                        <Link to={`/authors/${data.post.author.slug}`} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
                            <Typography component="p" variant='h5' fontWeight={700} >
                                {data.post.author.name}
                            </Typography>
                        </Link>
                        <Typography component="p" variant='p' color="text.secondary" mt={0.5}>
                            {data.post.author.field}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} mt={5}>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.post.content.html) }} style={{ textAlign: "justify" }}></div>
                </Grid>
                <Grid container sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", backgroundColor: "#fcfcfc", borderRadius: 4, py: 1, mt: 5, p: 3, }} display="flex" flexDirection="column">
                    <Typography component="h4" variant='h6' xs={12}>
                        تگ ها:
                    </Typography>
                    <Grid item mr={5}>
                        {
                            tags.map(tag => {
                                if (tag === data.post.title) {
                                    return
                                }
                                return (
                                    <Link to={`/search?q=${tag}`}>
                                        <Button variant='text' sx={{ fontSize: 16 }} >#{tag}</Button>
                                    </Link>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CommentForm slug={slug} />
                </Grid>
                <Grid item xs={12}>
                    <Comments slug={slug} />
                </Grid>
            </Grid>
        </Container >

    )
}

export default BlogPage