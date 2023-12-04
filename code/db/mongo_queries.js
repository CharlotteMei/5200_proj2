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
    return result;
}

async function deleteProduct(id) {
    console.log("[DB] Deleting product with id = ", id);
    const database = await connectToDatabase();
    const result = await database.collection('Product').deleteOne({ _id: new ObjectId(id)});
    return result;
}


module.exports = {
    createProduct,
    readAllProducts,
    readProduct,
    updateProduct,
    deleteProduct

    
};