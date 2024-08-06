import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_AUTHORS_INFO } from "../../graphql/queries"
import { Avatar, Divider, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function Authors() {

  const { loading, data, error } = useQuery(GET_AUTHORS_INFO)

  if (loading) return <h3>در حال گرفتن دیتا...</h3>
  if (error) return <h3>نتونستیم دیتا رو بگیریم. اگه حال داشتید بعدا امتحان کنید!</h3>

  const { authors } = data

  return (
    <Grid container sx={{ boxShadow: "rgba(0,0,0,0.1) 0 4px 12px", borderRadius: 4 }} mt={4}>
      {authors.map((author, index) => (
        <React.Fragment key={author.id}>
          <Grid item xs={12} padding={2}>
            <Link to={`/authors/${author.slug}`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Avatar src={author.avatar.url} sx={{ marginLeft: 2 }} />
              <Typography component="h4" variant='p' color="text.secondary">{author.name}</Typography>
            </Link>
          </Grid>
          {index !== authors.length - 1 && (
            <Grid item xs={12}>
              <Divider variant='middle' />
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  )
}

export default Authors