import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function CardElem({ title, slug, coverPhoto, author }) {

    return (
        <Card sx={{ boxShadow: "rgba(0,0,0,0.1) 0 4px 12px", borderRadius: 4 }} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {
                !!author &&
                <Link to={`authors/${author.slug}`} style={{ textDecoration: "none", color: "black" }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={author.avatar.url}
                                sx={{ marginLeft: 1 }}
                            />
                        }
                        title={

                            <Typography
                                component="p"
                                variant="p"
                                color="text.secondary">
                                {author.name}
                            </Typography>
                        }
                    />
                </Link>
            }
            <CardMedia component="img" height="194" image={coverPhoto.url} alt={slug} />
            <Divider variant="fullWidth" />
            <CardContent sx={{ flexGrow: 1 }}>
                <Link to={`/blogs/${slug}`} style={{ textDecoration: "none" }}>
                    <Typography component="h3" variant="h6" color="text.primary" fontWeight={600}>
                        {title}
                    </Typography>
                </Link>
            </CardContent>
            <Divider variant="middle" sx={{ margin: "10px" }} />
            <CardActions>
                <Link to={`/blogs/${slug}`} sx={{ textDecoration: "none", width: "100%" }} style={{ width: "100%" }}>
                    <Button variant="outlined" size="small" sx={{ width: "100%", borderRadius: 3 }}>مطالعه‌ی مقاله</Button>
                </Link>
            </CardActions>
        </Card >
    )
}

export default CardElem