import Shop from "../2_schema/shop.schema.js";
import uplodeOnCloudinari from "../9_cloudinari.multer/cloudinari.js";

const createShop = async (req, res) => {
  try {
    // Destructure Address with both cases to prevent undefined address issue
    const { name, city, state, address, Address } = req.body;
    const finalAddress = address || Address;

    // 1. Declare imgUrl outside block so it is accessible everywhere in this function
    let imgUrl = null;

    if (req.file) {
      console.log("File received by multer:", req.file);

      const uploadResult = await uplodeOnCloudinari(req.file.path);

      if (!uploadResult) {
        return res.status(500).json({
          message: "Image upload failed",
        });
      }

      // Extract actual URL string from Cloudinary object
      imgUrl = uploadResult.secure_url;
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      // Check if image is present for new shop creation
      if (!imgUrl) {
        return res.status(400).json({ message: "Shop image is required" });
      }

      // Create New Shop
      shop = await Shop.create({
        name,
        city,
        state,
        address: finalAddress,
        image: imgUrl,
        owner: req.userId,
      });
    } else {
      // Update Existing Shop
      const updateData = {
        name,
        city,
        state,
        address: finalAddress,
      };

      // Only update image if a new file was uploaded
      if (imgUrl) {
        updateData.image = imgUrl;
      }

      shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true });
    }

    await shop.populate("owner");
    return res.status(200).json(shop);
  } catch (error) {
    console.error("CREATE SHOP ERROR:", error);
    return res.status(400).json({
      message: "shop create error",
      error: error.message || error,
    });
  }
};

export default createShop;

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner item"
    );

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get my shop error: ${error.message}` });
  }
};