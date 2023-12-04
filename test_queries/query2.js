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


const { MongoClient } = require('mongodb');

async function runQuery() {
    const uri = 'mongodb://localhost';
    const dbName = '5200_proj2';

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db(dbName);
        const collection = database.collection('User');

        const result = await collection.aggregate([
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  "user.user_id": 2,
                },
            },
            {
              $unwind: "$rack",
            },
            {
              $lookup: {
                from: "Product",
                localField: "rack.product_id",
                foreignField: "product_id",
                as: "products",
              },
            },
            {
              $unwind: "$products",
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  rack: 1,
                  products: 1,
                },
            },
          ]).toArray();

        console.log(result);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

runQuery();
