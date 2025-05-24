const { pgconnect } = require('./postgresconnection');

module.exports = {

    Getalldetails: async (query) => {

        try {

            let client = await pgconnect();

            client.connect();

            let data = await client.query(query);
                        
            console.log(data.rows);

            return(data.rows);

        } catch (e) {
            console.log("e" , e);
            return false;

        }

    }
}