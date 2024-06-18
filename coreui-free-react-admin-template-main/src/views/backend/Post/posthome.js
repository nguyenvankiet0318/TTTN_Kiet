import React from 'react'
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAllPosts,
  deletePostById,
  IMAGE_URL,
} from "../../../api/apiService";

import { Link } from 'react-router-dom'


const PostHome = () => {
  const [posts, setPosts] = useState([]);
  const [checkDeletePost, setCheckDeletePost] = useState(false);
  const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate();
  useEffect(() => {
    getAllPosts("Posts").then((item) => setPosts(item.data));
  }, [navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deletePostByIdHandler = (id) => {
    deletePostById("Posts", id).then((item) => {
      console.log(item);
      if (item.status === 204) {
        setCheckDeletePost(true);
        setPosts(posts.filter((key) => key.id !== id));
      }
    });
  };


  return (

    <CRow>
      <CCol>
<CCardBody>
              <Link to="/backend/addpost">
                <button>Add Post</button>
              </Link>
              {/* Existing table code */}
            </CCardBody>

            </CCol>
      <CCol xs={12}>

        <CCard className="mb-4">

          <CCardHeader>
            <strong>React Table</strong> <small></small>



          </CCardHeader>
          <CCardBody>

            <DocsExample href="">
              <CTable color="dark" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(rowsPerPage > 0
                    ? posts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : posts
                  ).map((row) => (
                    <>
                      <CTableRow key={row.id}>
                        <CTableHeaderCell>{row.name}</CTableHeaderCell>
                        <CTableDataCell>
                        {row.imageUrl && (
                            <img
                              src={IMAGE_URL + row.imageUrl}
                              style={{ width: 100 }}
                              alt={row.imageUrl}
                            />
                          )}
                        </CTableDataCell>
                        <CTableHeaderCell>{row.description}</CTableHeaderCell>

                        {/* <CTableHeaderCell>{row.Description}</CTableHeaderCell> */}


                        <CTableDataCell>
                          <Link
                            to={`/backend/home/edit/post/${row.id}`}
                          >
                            <button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </button>
                          </Link>
                        </CTableDataCell>

                        <CTableDataCell> <button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => deletePostByIdHandler(row.id)}
                        >
                          Remove
                        </button>
                        </CTableDataCell>
                      </CTableRow>

                    </>

                  ))}
                </CTableBody>
              </CTable>
            </DocsExample>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="white-text"
            />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PostHome;
