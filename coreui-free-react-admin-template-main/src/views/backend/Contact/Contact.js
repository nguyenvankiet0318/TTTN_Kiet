import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { InputAdornment } from '@material-ui/core';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../../api/apiService";
import MenuItem from "@mui/material/MenuItem";
import { Image } from "react-bootstrap";
import { convertLength } from "@mui/material/styles/cssUtils";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 600,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
    },
    txtInput: {
        width: "98%",
        margin: "10px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddContact() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    //const [icon, setIcon] = useState("");
    const navigate = useNavigate();





    const handleCreateContact = (event) => {
        event.preventDefault();

        if (
            name !== ""



        ) {
            const contact = {

              name,
              email,
              subject,
              message,
                // published,

            };
            console.log(contact);
            setCheckAdd(true); // Nếu upload thành công, setCheckAdd thành true

            addContact("Contact", contact).then((item) => {
                console.log("added", item);

            });
        } else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    };
    useEffect(() => {
        if (checkAdd) {
            const timeout = setTimeout(() => {
                navigate("/backend/contacthome");
            }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

            // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
            return () => clearTimeout(timeout);
        }
    }, [checkAdd, navigate]);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Contact
                        </Typography>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    // value={productDescription}
                                    name="name"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Email
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    // value={productDescription}
                                    name="email"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Subject
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="subject"
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                    name="subject"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                   Message
                                </Typography>
                                <TextField
                                    placeholder="Body"
                                    id="message"
                                    onChange={(e) => setMessage(e.target.value)}
                                    // value={productDescription}
                                    name="message"
                                    className={classes.txtInput}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "30px" }}>
                                <Button
                                    type="button"
                                    onClick={handleCreateContact}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add Tag
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
