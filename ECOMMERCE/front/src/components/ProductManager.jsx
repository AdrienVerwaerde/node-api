import React, { useEffect, useState } from 'react';
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

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isAddMode, setIsAddMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        desc: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4001/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:4001/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
        }
    };


    const handleEditClick = (product) => {
        setIsAddMode(false);
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            desc: product.desc
        });
        setOpen(true);
    };

    const handleAddClick = () => {
        setIsAddMode(true);
        setFormData({
            name: '',
            price: '',
            category: '',
            desc: ''
        });
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setCurrentProduct(null);
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
            await axios.post('http://localhost:4001/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            await axios.put(`http://localhost:4001/api/products/${currentProduct._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        fetchProducts();
        handleDialogClose();
    } catch (error) {
        console.error('Error saving product:', error);
    }
};

    return (
        <Container sx={{ mt:"2em"}}>
            <Typography variant="h4" gutterBottom>
                Product Manager
            </Typography>
            <Button variant="contained" onClick={handleAddClick} sx={{ mb:2, backgroundColor: "#29a929", color: "white" }}>
                create product
            </Button>
            <Divider sx={{width: 166}}/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}€</TableCell>
                                <TableCell>{product.desc}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{ marginRight: '1em'}}
                                        onClick={() => handleEditClick(product)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{backgroundColor: 'red', color: 'white'}}
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for editing product */}
            <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>{isAddMode ? "Add Product" : "Edit Product"}</DialogTitle>

                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="desc"
                        value={formData.desc}
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


