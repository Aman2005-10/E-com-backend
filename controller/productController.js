import Product from "../models/productModel.js";


export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

     if(!title || !description || !price || !category || !stock){
      return res.status(400).json({
        success: false,
        message: "All fileds  are required",
      });
    } 
    

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

   

  // <img src={`http://localhost:3000/${product.image}`} alt={product.title} />  correct image for frontend



    // Save product
    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      image:req.file.path.replace(/\\/g, "/"),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Cloudinary Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};