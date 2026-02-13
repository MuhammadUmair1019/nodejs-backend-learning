import Order from "../models/orderModel.js";
import Inventory from "../models/inventoryModel.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    // Total orders count
    const totalOrders = await Order.countDocuments();

    // Orders grouped by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Total revenue (delivered orders only)
    const revenueResult = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Top 5 popular items (by total quantity ordered)
    const popularItems = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItem",
          name: { $first: "$items.name" },
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    // Low stock count
    const lowStockCount = await Inventory.countDocuments({
      $expr: { $lte: ["$stock", "$lowStockThreshold"] },
    });

    res.json({
      totalOrders,
      ordersByStatus,
      totalRevenue,
      popularItems,
      lowStockCount,
    });
  } catch (error) {
    next(error);
  }
};
