import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { addPost, getAllTopics,getTopicById } from "../../../api/apiService";
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

export default function AddPost() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [topics, setTopics] = useState([]);   
    const [topicAll, setTopicAll] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [active, setActive] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [topicById, setTopicById] = useState(null);

    const navigate = useNavigate();


    const handleResetImages = () => {
        setSelectedImages([]);
        setImageFiles([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const TopicData = await getAllTopics("Topics");
                setTopicAll(TopicData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // async function getTopicById(topicId) {
    //     try {
    //       const response = await fetch(`http://localhost:8080/api/Topics/${topicId}`);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error ${response.status}`);
    //       }
    //       const data = await response.json();
    //       setTopicById(data.response);
    //     } catch (error) {
    //       console.error('Error fetching topic:', error);
    //       throw error;
    //     }
    //   }
// console.log(topicById);
    const handleChangeTopic = (event) => {
        const selectedIds = event.target.value;
        setTopics(selectedIds);
        // getTopicById(topics);
        console.log(topicById);
      };
    const handleUploadImages = async (id) => {
        const formData = new FormData();
        imageFiles.forEach((image) => {
            formData.append("files", image);
        });
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const response = await axios.post(
                `http://localhost:8080/api/Posts/uploadImages/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt header Content-Type là multipart/form-data
                    },
                }
            );

            console.log("added", response);
            if (response.status === 200) {
                setCheckAdd(true); // Nếu upload thành công, setCheckAdd thành true
            } else {
                alert("Bạn chưa nhập đủ thông tin!"); // Nếu có lỗi, hiển thị thông báo
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi khi upload ảnh!"); // Xử lý khi có lỗi xảy ra trong quá trình upload
        }
    };




    const handleAddPost = (event) => {
        event.preventDefault();
        if (description !== "") {
            const post = {
                name,
                topic: topics ,
                description,
                imageUrl,
            };
            console.log(post);
            console.log("images", selectedImages);

            addPost("Posts", post)
                .then((response) => {
                    console.log("added", response);
                    if (response.status === 201 && response.data) {
                        handleUploadImages(response.data.id);
                        setCheckAdd(true);
                    } else {
                        alert("Lỗi khi thêm danh mục mới!");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Lỗi khi gọi API!");
                });
        } else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    };

    useEffect(() => {
        if (checkAdd) {
            const timeout = setTimeout(() => {
                navigate("/backend/posthome");
            }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

            // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
            return () => clearTimeout(timeout);
        }
    }, [checkAdd, navigate]);


    const handleFileChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];
        const filesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setSelectedImages([...selectedImages, ...imagesArray]); // Cập nhật mảng hiển thị hình ảnh
                    setImageFiles([...imageFiles, ...filesArray]); // Cập nhật mảng các file hình ảnh

                    // Sắp xếp lại mảng selectedImages để đảm bảo thứ tự đún
                }
            };

            if (file) {
                reader.readAsDataURL(file);
                filesArray.push(file); // Thêm file vào mảng các file
            }
        }
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Post
                        </Typography>
                        <Grid item xs={12} container>

                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name Post
                                </Typography>
                                <TextField
                                    placeholder="Post Name"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    // value={productName}
                                    name="name"
                                    variant="outlined"
                                    className={classes.txtInput}
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Post Description
                                </Typography>
                                <TextField
                                    placeholder="Post Description"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    // value={productName}
                                    name="description"
                                    variant="outlined"
                                    className={classes.txtInput}
                                    size="small"
                                />
                            </Grid>





                            <Grid item xs={12}>
    <Typography gutterBottom variant="subtitle1">
      Choose Topic
    </Typography>
    <TextField
      id="topic"
      name="topic"
      select
      value={topics.name}
      onChange={handleChangeTopic}
      variant="outlined"
      className={classes.txtInput}
    >
      {topicAll.map((option) => (
        <MenuItem key={option.id} value={option}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  </Grid>



                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="imageInput"
                                />
                                <label htmlFor="imageInput">
                                    <Button component="span">Choose Images</Button>
                                    <Button
                                        type="button"
                                        onClick={handleResetImages}
                                        fullWidth
                                        color="success"
                                        className={classes.submit}
                                    >
                                        Reset Images
                                    </Button>
                                </label>
                                {selectedImages.map((image, index) => (
                                    <div key={index}>
                                        <Image src={image} alt={`Selected ${index}`} width={80} />
                                    </div>
                                ))}
                            </div>
                            <Grid item xs={12} style={{ marginTop: "30px" }}>
                                <Button
                                    type="button"
                                    onClick={handleAddPost}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add Post
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}