// 5200_proj2.User.aggregate([
//     {
//         $unwind: "$feedbacks"
//     },
//     {
//         $match: {
//             "feedbacks.rating": { $gt: 3 }
//         }
//     },
//     {
//         $group: {
//             _id: null,
//             feedbackCount: { $sum: 1 }
//         }
//     }
// ]);