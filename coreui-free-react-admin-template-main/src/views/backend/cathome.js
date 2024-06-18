import React from 'react'
import Button from "@mui/material/Button";
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
  getAllCategories,
  deleteCategoryById,
  IMAGE_URL,
} from "../../api/apiService";

import { Link } from 'react-router-dom';
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [checkCategoryDelete, setCheckDeleteCategory] = useState(false);
  const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllCategories("categories").then((item) => setCategories(item.data));
  }, [navigate]);


const deleteCategoryByIdHandler = (id) => {
  deleteCategoryById("categories", id).then((item) => {
    console.log(item);
    if (item.status === 204) {
      setCheckDeleteCategory(true);
      setCategories(categories.filter((category) => category.id !== id));
    }
  });
};
  return (
    <div>
      <CRow>

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>
                <Link to="/backend/categories">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                  >
                    Add Category
                  </Button>

                </Link>
              </strong>
            </CCardHeader>
            <CCardBody>

              <CTable color="dark" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Tên danh mục</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Parent ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Publish</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Modify</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(rowsPerPage > 0
                    ? categories.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : categories
                  ).map((row) => (
                    <>
                      <CTableRow key={row.id}>
                        <CTableHeaderCell>{row.categoryName}</CTableHeaderCell>
                        <CTableDataCell>
                          {row.imagePath && (
                            <img
                              src={IMAGE_URL + row.imagePath}
                              style={{ width: 100 }}
                              alt={row.imagePath}
                            />
                          )}
                        </CTableDataCell>

                        <CTableDataCell align="center">
                          {row.categoryDescription}
                        </CTableDataCell>

                        {/* <CTableDataCell>{getParentCategoryName(row.parentId)}</CTableDataCell> */}

                        <CTableDataCell align="center">
  {row.parentId ? row.parentId.categoryName : ""}


</CTableDataCell>


                        <CTableDataCell align="center">
                          {row.active ? "Active" : "Not Active"}
                        </CTableDataCell>
                        <CTableDataCell>
                        {/* <Link to={`/edit-product/${row.id}`}>Edit</Link> */}
                        <Link to={`/backend/cathome/edit/category/${row.id}`}>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Edit
                          </Button>

                        </Link>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => deleteCategoryByIdHandler(row.id)}
                        >
                          Remove
                        </Button>
                      </CTableDataCell>



                      </CTableRow>

                    </>

                  ))}
                </CTableBody>

              </CTable>
              <TablePagination
                // rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ color: 'white' }}
              />


            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default CategoryList
