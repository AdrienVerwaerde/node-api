// src/components/OrderManager.js
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
    Select,
    MenuItem
} from '@mui/material';

function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [formData, setFormData] = useState({
        status: '',
        totalPrice: '',
    });
    const orderStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4001/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Handle Delete Order
    const handleDelete = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:4001/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error.response?.data || error.message);
        }
    };

    // Handle Edit Click
    const handleEditClick = (order) => {
        setCurrentOrder(order);
        setFormData({
            status: order.status,
        });
        setOpen(true);
    };

    // Close Dialog
    const handleDialogClose = () => {
        setOpen(false);
        setCurrentOrder(null);
    };

    // Handle Form Change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    

    // Handle Update Order
    const handleUpdate = async () => {
        const token = localStorage.getItem('token');  
        try {
            await axios.put(`http://localhost:4001/api/orders/${currentOrder._id}`, { status: formData.status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchOrders();
            handleDialogClose();
        } catch (error) {
            console.error('Error updating order:', error.response?.data || error.message);
        }
    };

    return (
        <Container sx={{ mt: "2em" }}>
            <Typography variant="h4" gutterBottom>
                Order Manager
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.userId?.username || "Utilisateur inconnu"}</TableCell>
                                <TableCell>
                                    {order.products.map((product, index) => (
                                        <div key={index}>
                                            {product.productId ? (
                                                <>
                                                    {product.productId.name} - Quantity: {product.quantity}
                                                </>
                                            ) : (
                                                "Produit inconnu - Quantité : " + product.quantity
                                            )}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{ marginRight: '1em' }}
                                        onClick={() => handleEditClick(order)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: 'red', color: 'white' }}
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            {/* Dialog for editing order */}
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogContent>
                    <Select
                        margin="dense"
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        fullWidth
                    >
                        {orderStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OrderManager;
