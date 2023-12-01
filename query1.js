const { MongoClient } = require('mongodb');

async function runQuery() {
  const uri = 'mongodb://localhost';
  const dbName = '5200_proj2';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection('Product');

    const result = await collection.aggregate([
      { $match: { type: 'cream', size_in_grams: { $gte: 100, $lte: 300 } } },
      {
        $group: {
          _id: null,
          averagePrice: { $avg: '$price_in_usd' },
        },
      },
      {
        $project: {
          _id: 0,
          averagePrice: 1,
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
