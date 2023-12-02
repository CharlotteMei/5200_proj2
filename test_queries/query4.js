

const { MongoClient } = require('mongodb');

testUserId = 1;
testProductId = 74;
testDate = "7/20/2020";

async function updateRackPurchase(userId, productId, date) {
  const uri = 'mongodb://localhost';
  const dbName = '5200_proj2';

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection('User');

    const result = await collection.updateOne(
        {
            "user.user_id": userId,
            "rack": {
                $elemMatch: {
                    "product_id": productId
                }
            }
        },
        {
            $set: {
                "rack.$.purchased_date": date
            }
        }
    );

    console.log(result);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

updateRackPurchase(testUserId, testProductId, testDate);
