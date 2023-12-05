# 5200_proj2

## assignment task1-5
See the pdf document called "cs5200 project 2 doc"

## assignment task 6 demo
see video called DEMO

## fake data
all data in the database are fake and were generated using https://www.mockaroo.com/schemas/new

## recreate db through dump file
Folder "dump_db" contains the db dump file. To regenerate the db, please follow the instruction:
To regenerate a MongoDB database using the dump files in the "cs5200_proj2" folder, follow these steps:

1. **Navigate to the MongoDB bin Directory:**
   Open a terminal or command prompt and navigate to the directory where MongoDB's command-line tools are located. If MongoDB is installed globally, you can use a command like `cd /path/to/mongodb/bin`.

2. **Run mongorestore:**
   Execute the `mongorestore` command, specifying the path to the "cs5200_proj2" folder as the source for the dump files.

    ```bash
    mongorestore --uri "mongodb://localhost:27017/5200_proj2" "/path/to/cs5200_proj2"
    ```

   Replace:
   - `"mongodb://localhost:27017/5200_proj2"`: The connection URI for your MongoDB instance. Adjust the host and port if necessary.
   - `"/path/to/cs5200_proj2"`: The full path to the "cs5200_proj2" folder containing the dump files.

3. **Verify the Database:**
   After the `mongorestore` process completes, verify that the database has been regenerated successfully by connecting to MongoDB and checking the contents.

    ```bash
    mongo "mongodb://localhost:27017/5200_proj2"
    ```

   In the MongoDB shell, you can list the available databases and switch to the regenerated database:

    ```bash
    show dbs
    use 5200_proj2
    show collections
    ```

   Ensure that the collections and data are present as expected.

By following these steps, you should be able to use the dump files in the "cs5200_proj2" folder to regenerate your MongoDB database. Adjust the connection URI and paths based on your specific MongoDB setup and file locations.
