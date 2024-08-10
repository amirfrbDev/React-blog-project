import { Box, Card, CardContent, CardHeader, Container, Grid, Typography, CardMedia } from '@mui/material';
import { convertDate } from '../../helpers/dateConverter';
import { convertTime } from '../../helpers/timeConverter';
import { Link } from 'react-router-dom';


function HorizontalCardElem({ post }) {

    const [year, month, day] = convertDate(post.dataPublished)
    
    return (
        <Grid key={post.id} item xs={12} md={12} m="auto" mt={3} sx={{ boxShadow: "rgba(0,0,0,0.1) 0 4px 12px", borderRadius: 4 }}>
            <Link to={`${post.slug}`} style={{ textDecoration: "none" }}>
                <Card sx={{ display: 'flex', flexDirection: "row-reverse", justifyContent: "start" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                        <CardContent>
                            <Typography component="div" variant='p' fontWeight={500} fontSize={19}>
                                {post.title}
                            </Typography>
                            <Box component="div">
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    توسط {post.author.name}
                                </Typography>
                                <Typography variant='subtitle2' color="text.secondary" component="div">
                                    در {`${day} ${month} ${year}`} - ساعت {convertTime(post.dataPublished)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 220 }}
                        image={post.coverPhoto.url}
                        alt={post.title}
                    />
                </Card>
            </Link>
        </Grid>
    )
}

export default HorizontalCardElem