import React from 'react'
import { GET_BLOGS_INFO } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import CardElem from '../shared/CardElem';
import Loader from '../shared/Loader';





function Blogs() {

    const { loading, data, error } = useQuery(GET_BLOGS_INFO)

    console.log({loading,data,error});


    if (loading) return <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Loader />
    </div>

    if (error) return <h2>مشکلی پیش اومده! دوباره امتحان کنین:)</h2>

    if (data) {
        return <Grid container spacing={1}>
            {data.posts.map(post => (
                <Grid key={post.id} item xs={12} sm={6} md={6} lg={4} style={{ display: 'flex' }} mt={1}>
                    <CardElem {...post} />
                </Grid>
            ))}

        </Grid>
    }

}

export default Blogs