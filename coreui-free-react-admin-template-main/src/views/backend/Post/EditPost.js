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
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getAllPosts, getAllTopics, getPostById, IMAGE_URL } from "../../../api/apiService";
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

export default function EditPost() {
  const classes = useStyles();
  const [post, setPost] = useState([]);

  const { id: idPost } = useParams();
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState([]);
  const [topicAll, setTopicAll] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  // const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();


  const handleResetImages = () => {
    setSelectedImages([]);
    setImageFiles([]);
  };

  const handleChangeTopic = (event) => {
    const selectedIds = event.target.value;
    setTopic(selectedIds);
    // getTopicById(topics);
    console.log(topicById);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPostById("Posts", idPost);
        setPost([post.data]);
        console.log(post.data);
        setName(post.data.name);
        console.log(post.data.name);
        setDescription(post.data.description);
        setImageUrl(post.data.imageUrl);
        setTopic(post.data.topic)
                console.log(post.data.topic);

        const topicData = await getAllTopics("Topics");
        setTopicAll(topicData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idPost]);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/slideshows/${idSlide}`
  //       );
  //       console.log("yyyyyyyyyyyyyyyyyyy");
  //       setImages(response.data);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };

  //   fetchImages();
  // }, [idSlide]);
  const handleUploadImages = async (id) => {
    const formData = new FormData();
    imageFiles.forEach((image) => {
      formData.append("files", image);
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

      console.log("added ga", response);
      if (response.status === 200) {
        setCheckUpdate(true); // Nếu upload thành công, setCheckAdd thành true
      } else {
        alert("Bạn chưa nhập đủ thông tin!"); // Nếu có lỗi, hiển thị thông báo
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi upload ảnh!"); // Xử lý khi có lỗi xảy ra trong quá trình upload
    }
  };
  const handleEditPost = async (event) => {
    event.preventDefault();

    if (
      description !== ""
    ) {
      const post = {
        name,
        topics: topic ,
        description,
        imageUrl,


      };
      console.log(post);
      try {
        const editedPost = await editPost(
          `Posts/${idPost}`,
          post
        );
        if (editedPost.status === 200) {
          if (imageFiles.length > 0) {
            handleUploadImages(editedPost.data.id);
          } else {
            setCheckUpdate(true);
          }
        } else {
          alert("Bạn chưa nhập đủ thông tin!");
        }
      } catch (error) {
        console.error("Error editing Post:", error);
      }
    }
  };

  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate("/backend/posthome");
      }, 1000); // Thời gian chờ trước khi chuyển hướng (miliseconds)

      // Xóa timeout khi component unmount hoặc khi checkUpdate thay đổi
      return () => clearTimeout(timeout);
    }
  }, [checkUpdate, navigate]);


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
              Edit Post
            </Typography>

            <Grid item xs={12} container>
            <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Post Name
                </Typography>
                <TextField
                  placeholder="Post Name"
                  id="name"
                  value={name}
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
                  id="descriptionUrl"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // value={productName}
                  name="descriptionUrl"
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
                  value={topic}
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
                {selectedImages.length === 0
                  ? post.map((post) => (
                    <div>
                      <Image
                        src={IMAGE_URL + post.imageUrl}
                        alt={`Selected ${post.imageUrl}`}
                        width={80}
                        key={post.id}
                      />
                    </div>
                  ))
                  : selectedImages.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image}
                        alt={`Selected ${index}`}
                        width={80}
                      />
                    </div>
                  ))}
              </div>
              <Grid item xs={12} style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  onClick={handleEditPost}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Edit Post
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
