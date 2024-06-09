const ProductModel = require("../models/productModel");

const Product = {
    addProduct: async (req, res) => {
        const {
            productName, productDescription, productPrice, productCategoryId, productImagesUri,
        } = req.body;
        if (!productName || !productDescription || !productPrice || !productCategoryId) {
            return res.status(400).json({message: "Missing required fields"});
        }
        try {
            await require("../models/productModel").addProduct(productName, productDescription, productPrice, productCategoryId, productImagesUri);
            return res.status(201).json({message: "Item Added successfully"});
        } catch (error) {
            return res.status(400).json({message: "Something went wrong", error});
        }
    },

    updateProduct: async (req, res) => {
        const currentTime = new Date();
        const {
            productId, productName, productDescription, productPrice, productCategoryId, ProductImages = [{}]
        } = req.body;
        try {
            await require("../models/productModel").updateProduct(productId, productName, productDescription, productPrice, productCategoryId, ProductImages, currentTime);
            return res.status(201).json({message: "Product updated successfully."});

        } catch (err) {
            res.status(400).json({message: "Something went wrong could not update product.", error: err});
        }
    },

    deleteProduct: async (req, res) => {
        const {productId} = req.body;
        try {
            await require("../models/productModel").deleteProduct(productId);
            return res.status(200).json({message: "Product deleted successfully"});
        } catch (err) {
            return res.status(400).json({message: "Something went wrong", error: err});
        }
    },

    getProductById: async (req, res) => {
        const {productId} = req.body;
        const product = await ProductModel.getProductById(productId);
        if (product) {
            return res.status(200).json(product);
        }
        return res.status(400).json({message: "No product found"});
    },

    getAllProducts: async (req, res) => {
        const allProducts = await ProductModel.getAllProducts();
        res.status(200).json(allProducts);
    },

    getProductsByCategory: async (req, res) => {
        const {productCategoryId} = req.body;
        const allProducts = await ProductModel.getProductsByCategory(productCategoryId);
        res.status(200).json(allProducts);
    },

    getOnSaleProducts: async (req, res) => {
        const allProducts = await ProductModel.getOnSaleProducts();
        res.status(200).json(allProducts);
    },

    getNewProducts: async (req, res) => {
        const allProducts = await ProductModel.getNewProducts();
        res.status(200).json(allProducts);
    }
};


module.exports = Product;
