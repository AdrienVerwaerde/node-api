const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authToken = require('../middlewares/authToken'); // Middleware d'authentification
const { categorySchema } = require('../middlewares/validators/categoryValidators');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID auto-généré de la catégorie
 *         name:
 *           type: string
 *           description: Le nom de la catégorie
 *         description:
 *           type: string
 *           description: La description de la catégorie
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la catégorie
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour de la catégorie
 *       example:
 *         id: 5f7e1b9f7e9e9e9e9e9e9e9
 *         name: "Électronique"
 *         description: "Catégorie pour tous les produits électroniques"
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: La liste de toutes les catégories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', categoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la catégorie
 *     responses:
 *       200:
 *         description: Détails de la catégorie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Protection par token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.post('/', authToken, validate(categorySchema), categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie existante
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Protection par token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la catégorie à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.put('/:id', authToken, validate(categorySchema), categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Protection par token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la catégorie à supprimer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 *       401:
 *         description: Non autorisé (Token manquant ou invalide)
 */
router.delete('/:id', authToken, categoryController.deleteCategory);

module.exports = router;
