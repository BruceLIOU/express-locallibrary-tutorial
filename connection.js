async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const MongoClient = require('mongodb').MongoClient;

    //const uri = "mongodb+srv://bruce:21dec1977@cluster0.gshef.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
	const uri = "mongodb+srv://bruce:21dec1977@cluster0.gshef.mongodb.net/local_library?retryWrites=true&w=majority";

 	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await listDatabases(client);
        //await findOneListingByName(client, "Ribeira Charming Duplex");
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findOneListingByName(client, nameOfListing) {
    result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}