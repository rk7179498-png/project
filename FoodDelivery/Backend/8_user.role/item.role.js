import Item from "../2_schema/item.schema.js";
import Shop from "../2_schema/shop.schema.js";

export const addItem = async (req, res) => {
  try {
    const { price, category, name, foodType } = req.body;
    let img;
    if (req.file) {
      img = await uplodeOnCloudinari(req.file.path);
      
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "shop not find" });
    }
    const item = await Item.create({
      price,
      category,
      name,
      foodType,
      image,
      shop: shop._id,
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `add item error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { price, category, name, foodType } = req.body;
    let img;
    if (req.file) {
      img = await uplodeOnCloudinari(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      { price, category, name, foodType },
      { new: true },
    );
    if (!item) {
      return res.status(400).json({ message: "item not find" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `edit item error ${error}` });
  }
};
