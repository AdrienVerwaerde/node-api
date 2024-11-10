// src/components/CategoryManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from '@mui/material';

function CategoryManager() {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isAddMode, setIsAddMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
    });

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4001/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:4001/api/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error.response?.data || error.message);
        }
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setFormData({
            name: category.name,
        });
        setOpen(true);
    };

    const handleAddClick = () => {
        setIsAddMode(true);
        setFormData({
            name: '',
        });
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setCurrentCategory(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            if (isAddMode) {
                await axios.post(`http://localhost:4001/api/categories`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.put(`http://localhost:4001/api/categories/${currentCategory._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            fetchCategories();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating or adding user:', error.response?.data || error.message);
        }
    };


    return (
        <Container sx={{ mt:"2em"}}>
        <Typography variant="h4" gutterBottom>
            Category Manager
        </Typography>
        <Button variant="contained" onClick={handleAddClick} sx={{ mb:2, backgroundColor: "#29a929", color: "white" }}>
                create category
            </Button>
            <Divider sx={{width: 175}}/>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell>{category._id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    sx={{ marginRight: '1em'}}
                                    onClick={() => handleEditClick(category)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{backgroundColor: 'red', color: 'white'}}
                                    onClick={() => handleDelete(category._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Dialog for editing category */}
        <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{isAddMode ? "Add Category" : "Edit Category"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary">
    {isAddMode ? "Add" : "Update"}
</Button>
            </DialogActions>
        </Dialog>
    </Container>
    );
};

export default CategoryManager;
