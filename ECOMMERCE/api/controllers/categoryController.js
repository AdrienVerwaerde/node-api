const Category = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
    try {            
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}

exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}

exports.createCategory = async (req, res) => {
    const {name} = req.body;
    try {
        const newCategory = new Category({name});
        const savedCategory = await newCategory.save();
        res.status(201).json({message: "Category created", category: savedCategory});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json({message: "Category deleted", category: deletedCategory});
    } catch (error) {        
        res.status(500).json({message: "Server error", error});
    }
}

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const {name} = req.body;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.status(200).json({message: "Category updated", category: updatedCategory});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}