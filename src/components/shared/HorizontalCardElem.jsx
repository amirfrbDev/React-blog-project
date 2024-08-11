import { Box, Card, CardContent, Grid, Typography, CardMedia } from '@mui/material';
import { convertDate } from '../../helpers/dateConverter';
import { convertTime } from '../../helpers/timeConverter';
import { Link } from 'react-router-dom';


function HorizontalCardElem({ post }) {

    const [year, month, day] = convertDate(post.dataPublished)

    return (
        <Grid key={post.id} item xs={12} md={12} m="auto" mt={3} sx={{
            boxShadow: "rgba(0,0,0,0.1) 0 4px 12px", borderRadius: 4, transition:"all 0.1s",'&:hover': {
                boxShadow: "rgba(0, 0, 0, 0.185) 2px 8px 12px"
            }
        }}>

            <Card sx={{ display: 'flex', flexDirection: "row-reverse", justifyContent: "start" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <CardContent>
                        <Link to={`/blogs/${post.slug}`} style={{ textDecoration: "none", width: "fit-content" }} >
                            <Typography component="p" variant='p' color="black" fontWeight={500} fontSize={19} sx={{
                                transition: "0.1s",
                                '&:hover': {
                                    color: '#1e88e5',
                                },
                                
                                width: "fit-content"
                            }}>
                                {post.title}
                            </Typography>
                        </Link>
                        <Box component="div">
                            <Link to={`/authors/${post.author.slug}`} style={{ textDecoration: "none" }}>
                                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{
                                    '&:hover': {
                                        color: '#1e88e5',
                                    },
                                    transition: "all 0.1 ease-in"
                                }}>
                                    توسط {post.author.name}
                                </Typography>
                            </Link>
                            <Typography variant='subtitle2' color="text.secondary" component="div">
                                در {`${day} ${month} ${year}`} - ساعت {convertTime(post.dataPublished)}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                <Link to={`/blogs/${post.slug}`} style={{ textDecoration: "none" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 220 }}
                        image={post.coverPhoto.url}
                        alt={post.title}
                    />
                </Link>
            </Card>
        </Grid>
    )
}

export default HorizontalCardElem