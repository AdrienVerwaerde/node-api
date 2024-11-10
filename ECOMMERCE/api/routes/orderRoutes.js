const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authToken = require('../middlewares/authToken');  // Middleware d'authentification
const validate = require('../middlewares/validate');
const { orderSchema } = require('../middlewares/validators/orderValidators');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestion des commandes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *         - totalPrice
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de la commande
 *         userId:
 *           type: string
 *           description: L'ID de l'utilisateur ayant passé la commande
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: L'ID du produit commandé
 *               quantity:
 *                 type: integer
 *                 description: Quantité du produit commandé
 *           description: Liste des produits dans la commande
 *         totalPrice:
 *           type: number
 *           description: Le prix total de la commande
 *         status:
 *           type: string
 *           description: "Statut de la commande (ex: 'pending', 'shipped', 'delivered', 'canceled')"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la commande
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour de la commande
 *       example:
 *         id: 60c72b2f9b1e8a001c5e7e8a
 *         userId: 60c72b2f9b1e8a001c5e7e8b
 *         products:
 *           - productId: 60c72b2f9b1e8a001c5e7e8c
 *             quantity: 2
 *           - productId: 60c72b2f9b1e8a001c5e7e8d
 *             quantity: 1
 *         totalPrice: 99.99
 *         status: "pending"
 *         createdAt: "2023-10-17T10:00:00.000Z"
 *         updatedAt: "2023-10-17T10:30:00.000Z"
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: La liste de toutes les commandes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupérer une commande par ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la commande
 *     responses:
 *       200:
 *         description: Détails de la commande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Accès non autorisé
 */
router.post('/', validate(orderSchema), authToken, orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Mettre à jour une commande existante
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la commande à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès
 *       404:
 *         description: Commande non trouvée
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Accès non autorisé
 */
router.put('/:id', authToken, validate(orderSchema), orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   post:
 *     summary: Annuler une commande
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la commande à annuler
 *     responses:
 *       200:
 *         description: Commande annulée avec succès
 *       404:
 *         description: Commande non trouvée
 *       401:
 *         description: Accès non autorisé
 */
router.post('/:id/cancel', authToken, orderController.deleteOrder);

module.exports = router;
