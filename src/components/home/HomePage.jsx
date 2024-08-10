import { Box, colors, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Authors from '../author/Authors'
import Blogs from "../blog/Blogs"
import { ArrowBackRounded } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import SearchBox from '../search/SearchBox'

function HomePage() {
  return (

    <Container maxWidth="lg">
      <Grid container spacing={2} padding={3}>

        <Grid item xs={12} md={4} mt={4}>
          <Grid container direction="column" spacing={2} mt={7.4}> {/* Column Layout */}
            <Grid item xs={12}>
              <SearchBox />
            </Grid>
            <Grid item xs={12} mt={5}>
              <Typography component="h3" variant="h5" mb={3}>
                نویسندگان
              </Typography>
              <Authors />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8} mt={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography component="h3" variant="h4" mb={3}>
              مقالات
            </Typography>
            <Link to="/blogs" style={{ textDecoration: "none", color: "#1976d2" }}>
              <Typography component="h5" variant="h6" mb={3} display="flex" alignItems="center">
                مشاهده‌ی همه‌ی مقالات <ArrowBackRounded sx={{ mr: 1 }} />
              </Typography>
            </Link>
          </Box>
          <Blogs />
        </Grid>
      </Grid>
    </Container>


  )
}

export default HomePage