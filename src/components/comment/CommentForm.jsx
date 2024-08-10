import { useMutation } from '@apollo/client'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SEND_COMMENT } from '../../graphql/mutations'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function CommentForm({ slug }) {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [commentText, setCommentText] = useState("")

    const [sendComment, { loading, data, error }] = useMutation(SEND_COMMENT, {
        variables: {
            name: userName, email, text: commentText, slug
        }
    });

    const sendHandler = () => {
        if (userName && email && commentText) {
            sendComment();
            setUserName("");
            setEmail("")
            setCommentText("")
        } else {
            toast.warn("تمام فیلد ها رو پر کن عزیزم")
        }

        if (data) {
            toast.success("کامنتت ارسال شد و منتظر تاییده")
        }

        if (error) {
            toast.error("مشکلی پیش اومد و کامنتت ارسال نشد")
        }
    }


    return (
        <Grid container sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", borderRadius: 4, py: 1, mt: 5 }}>
            <Grid item xs={12} m={2}>
                <Typography component="p" variant='h6' fontWeight={700} color="primary">ارسال کامنت</Typography>
            </Grid>
            <Grid item xs={12} m={2}>
                <div>
                    <TextField
                        value={userName}
                        label="نام کاربری"
                        variant='outlined'
                        sx={{ width: "100%" }}
                        onChange={e => setUserName(e.target.value)} />
                </div>
                
            </Grid>
            <Grid item xs={12} m={2}>
                <TextField
                    value={email}
                    label="ایمیل"
                    variant='outlined'
                    sx={{ width: "100%" }}
                    onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12} m={2}>
                <TextField
                    value={commentText}
                    label="متن کامنت"
                    variant='outlined'
                    sx={{ width: "100%" }}
                    onChange={e => setCommentText(e.target.value)}
                    minRows={4}
                    multiline />
            </Grid>
            <Grid item xs={12} m={2}>
                {loading ? <Button variant='contained' disabled>در حال ارسال...</Button> :
                    <Button variant="contained" onClick={sendHandler}>ارسال</Button>
                }                                                                   
            </Grid>                     
            <ToastContainer />
            
        </Grid>
    )
    
}

export default CommentForm