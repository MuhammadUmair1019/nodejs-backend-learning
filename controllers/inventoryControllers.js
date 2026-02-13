import Inventory from "../models/inventoryModel.js";

export const setStock = async (req, res, next) => {
  try {
    const { menuItem, stock, lowStockThreshold } = req.body;

    const inventory = await Inventory.findOneAndUpdate(
      { menuItem },
      { stock, ...(lowStockThreshold !== undefined && { lowStockThreshold }) },
      { new: true, upsert: true },
    );

    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

export const getAllStock = async (req, res, next) => {
  try {
    const inventory = await Inventory.find().populate("menuItem", "name price");
    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

export const getStock = async (req, res, next) => {
  try {
    const inventory = await Inventory.findOne({
      menuItem: req.params.menuItemId,
    }).populate("menuItem", "name price");

    if (!inventory) {
      return res.status(404).json({ message: "Inventory record not found" });
    }
    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

export const getLowStock = async (req, res, next) => {
  try {
    const lowStock = await Inventory.find({
      $expr: { $lte: ["$stock", "$lowStockThreshold"] },
    }).populate("menuItem", "name price");

    res.json(lowStock);
  } catch (error) {
    next(error);
  }
};
