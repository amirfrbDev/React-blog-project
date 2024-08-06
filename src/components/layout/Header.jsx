import React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';

function Header() {
    return (

        <AppBar position='sticky'>
            <Container max-width="lg">
                <Toolbar>
                    <Typography component="h1" variant='h5' fontWeight="700" flex={1}>
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>
                            وبلاگ من
                        </Link>
                    </Typography>
                    <BookIcon />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header