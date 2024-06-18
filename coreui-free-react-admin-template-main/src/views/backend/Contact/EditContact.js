import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import {     getContactById,
  editContact} from "../../../api/apiService";
import { Image } from "react-bootstrap";
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

const EditContact = () => {
  const classes = useStyles();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const { id: idContact } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contact = await getContactById("Contact", idContact);
        console.log(contact.data);
        setName(contact.data.name);
        setSubject(contact.data.subject);
        setEmail(contact.data.email);
        setMessage(contact.data.message);
        // setRegularPrice(category.data.regularPrice);
        // setQuantity(category.data.quantity);
        // setPublished(category.data.published);
        // setProductWeight(category.data.productWeight);
        // setProductNote(category.data.productNote);
        // setShortDescription(category.data.shortDescription);
        // setSku(category.data.sku);

        // setImage(category.data.image);
        // setImages(category.data.image);
        // setDiscountPrice(product.data.discountPrice);
        // setCategories(product.data.categories.map((category) => category.id));
        // setTags(product.data.tags.map((category) => category.id));
        // const categoryData = await getAllCategories("categories");
        // setCategoryAll(categoryData.data);
        // const tagData = await getAllCategories("tags");
        // setTagAll(tagData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idContact]);

    const handleEditContact = async (event) => {
      event.preventDefault();

      if ( name !== "" ) {
        const contact = {
          // id: categoryId,
          // parentId: selectedParentCategory,

          name,
          subject,
          email,
          message
          // icon,
          // image,
          // active,
        };
        console.log(contact);

        try {
          const editedContact = await editContact(
            `Contact/${idContact}`,
            contact
          );
          setCheckUpdate(true);
        } catch (error) {
          console.error("Error editing category:", error);
        }
      }
    };
  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate("/backend/contacthome");
      }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

      // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
      return () => clearTimeout(timeout);
    }
  }, [checkUpdate, navigate]);

  // const handleChangeCategories = (event) => {
  //   const selectedIds = event.target.value;
  //   console.log(selectedIds);
  //   setCategories(selectedIds);
  // };
  // const handleChangeTags = (event) => {
  //   const selectedIds = event.target.value;
  //   setTags(selectedIds);
  // };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Edit Contact
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
                                    value={name}
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
                                    value={email}
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
                                    value={message}
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
                  onClick={handleEditContact}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Update Tag
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditContact;
