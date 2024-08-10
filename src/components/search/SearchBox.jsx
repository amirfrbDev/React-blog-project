import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_SEARCHED_POSTS } from '../../graphql/queries'
import { Box, Button, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "../../styles/index.css"


function SearchBox() {

    const [searchValue, setSearchValue] = useState("")
    const [showModal, setShowModal] = useState(false)


    const [getSearch, { loading, data, error }] = useLazyQuery(GET_SEARCHED_POSTS)
    const searchHandler = () => {
        console.log(searchValue)
        getSearch({
            variables: { title_contains: searchValue }
        });
        console.log({ loading, data, error });
    }



    return (
        <>
            <Box sx={{ boxShadow: "rgba(0,0,0,0.1) 0 4px 12px", borderRadius: 4, p: 2, display: 'flex', alignItems: "center" }}>
                <Typography component="h4" variant='h6'>
                    جستجو:
                </Typography>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        width: "35px",
                        height: "35px",
                        marginRight: "15px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontSize: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}>
                    +
                </button>
            </Box>
            {showModal && (
                <Box

                    component="div"
                    position="fixed"
                    top="0"
                    left="0"
                    width="100%"
                    height="100vh"
                    zIndex={10000}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" }}

                >

                    <CloseIcon
                        onClick={() => setShowModal(false)}
                        sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            width: "40px",
                            height: "40px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "50%",
                            zIndex: 10001,
                        }}
                    />
                    <Box
                        component="div"
                        sx={{
                            position: "relative",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            width: "400px",
                            boxSizing: "border-box",
                            textAlign: "center",
                        }}
                    >
                        <Box component="div" sx={{ marginBottom: "20px" }} >
                            <TextField fullWidth variant="outlined" label="چیزی بنویسید..." size="small" onChange={e => setSearchValue(e.target.value)} />
                        </Box>
                        <Button variant="contained" color="primary" onClick={searchHandler}>
                            جستجو
                        </Button>
                    </Box>

                </Box>
            )}
        </>
    )
}

export default SearchBox