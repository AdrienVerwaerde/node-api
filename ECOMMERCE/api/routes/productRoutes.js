const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authToken = require('../middlewares/authToken');
const { productSchema } = require('../middlewares/validators/productValidators');
const validate = require('../middlewares/validate');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestion des produits
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré du produit
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         price:
 *           type: number
 *           description: Le prix du produit
 *         description:
 *           type: string
 *           description: La description du produit
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du produit
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour du produit
 *       example:
 *         id: 5f7e1a7f8b8b8b8b8b8b8b8
 *         name: "Chaussures de sport"
 *         price: 59.99
 *         description: "Chaussures de sport pour la course"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: La liste de tous les produits.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Protection par token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.post('/', authToken, validate(productSchema), productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mettre à jour un produit existant
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Protection par token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.put('/:id', authToken, validate(productSchema), productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Protection par token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.delete('/:id', authToken, productController.deleteProduct);

module.exports = router;
