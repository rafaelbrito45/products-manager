import OrderModel from "../../../models/Order.model.js";

export async function getTotalAmount(productId: number): Promise<number> {
  try {
    const result = await OrderModel.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product_id": productId } },
      { $group: { _id: null, totalAmount: { $sum: "$products.amount" } } },
    ]);

    return result.length > 0 ? result[0].totalAmount : 0;
  } catch (error) {
    console.error("Error calculating total amount:", error);
    throw error;
  }
}
