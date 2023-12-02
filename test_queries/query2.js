// 5200_proj2.User.aggregate([
//     {
//       $match: {
//         "user.skin_type": "dry",
//       },
//     },
//     {
//       $unwind: "$rack",
//     },
//     {
//       $group: {
//         _id: "$rack.product_id",
//       },
//     },
//     {
//       $lookup: {
//         from: "Product",
//         localField: "_id",
//         foreignField: "product_id",
//         as: "products",
//       },
//     },
//     {
//       $unwind: "$products",
//     },
//     {
//       $match: {
//         "products.price_in_usd": { $lt: 50 }
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: "$products",
//       },
//     },
//   ]);