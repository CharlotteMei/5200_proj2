const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = '5200_proj2';

// Function to connect to MongoDB
async function connectToDatabase() {
    const client = new MongoClient(url);
    await client.connect();
    return client.db(dbName);
}

// Function to CRUD products
async function createProduct(product) {
    const database = await connectToDatabase();
    const result = await database.collection('Product').insertOne(product);
    return result;
}

async function readAllProducts() {
    const database = await connectToDatabase();
    const result = await database.collection('Product').find({}).toArray();
    return result;
}

async function readProduct(id) {
    const database = await connectToDatabase();
    const result = await database.collection('Product').findOne({ _id: new ObjectId(id) });
    return result;
}

async function updateProduct(id, product) {
    const database = await connectToDatabase();
    console.log("[DB] Updating product with id = ", id, " and product = ", product);
    const result = await database.collection('Product').replaceOne({ _id: new ObjectId(id) }, product);
    console.log("[DB] Update result = ", result);
    return result;
}

async function deleteProduct(id) {
    console.log("[DB] Deleting product with id = ", id);
    const database = await connectToDatabase();
    const result = await database.collection('Product').deleteOne({ _id: new ObjectId(id) });
    return result;
}

async function readRack(userId) {
    const database = await connectToDatabase();
    const userCollection = database.collection('User');
    // query to get rack items for a given user
    const result = await userCollection.aggregate([
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
    console.log("[DB] Reading rack using userId", userId," result = ", result);
    return result;
}


module.exports = {
    createProduct,
    readAllProducts,
    readProduct,
    updateProduct,
    deleteProduct,
    readRack,
};