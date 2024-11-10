const Order = require('../models/orderModel');

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username').populate('products.productId', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "Erreur du serveur", error});
    }
}

// Récupérer une commande par ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'username').populate('products.productId', 'name');
        if (!order) {
            return res.status(404).json({message: "Commande non trouvée"});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: "Erreur du serveur", error});
    }
}

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({message: "Erreur du serveur", error});
    }
}

// Mettre à jour une commande existante
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedOrder) {
            return res.status(404).json({message: "Commande non trouvée"});
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: "Erreur du serveur", error});
    }
}

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({message: "Commande non trouvée"});
        }
        res.status(200).json({message: "Commande supprimée avec succès"});
    } catch (error) {
        res.status(500).json({message: "Erreur du serveur", error});
    }
}
