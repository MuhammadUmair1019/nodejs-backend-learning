import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import MenuItem from "../models/menuItemModel.js";
import Inventory from "../models/inventoryModel.js";

export const placeOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Snapshot prices and build order items
    const orderItems = [];
    let totalAmount = 0;

    for (const cartItem of cart.items) {
      const menuItem = cartItem.menuItem;

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: cartItem.quantity,
      });

      totalAmount += menuItem.price * cartItem.quantity;

      // Deduct inventory
      await Inventory.findOneAndUpdate(
        { menuItem: menuItem._id },
        { $inc: { stock: -cartItem.quantity } },
      );
    }

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      totalAmount,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Users can only see their own orders, admin/manager can see all
    if (
      order.user.toString() !== req.userId.toString() &&
      !["admin", "manager"].includes(req.userRole)
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
