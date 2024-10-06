require('dotenv').config();
const { execSync } = require( 'child_process' );
const DB_NAME = process.env.DATABASE;
    
try{
    
    execSync(`mongoimport --db ${DB_NAME} --collection admins --drop --file "${process.cwd()}/seed/data/Unolo.admins.json" --jsonArray `);
    execSync(`mongoimport --db ${DB_NAME} --collection events --drop --file "${process.cwd()}/seed/data/Unolo.events.json" --jsonArray `);
    console.log( `Imported documents into database ${DB_NAME}` );
    
} catch(err) {
    
    console.log(`Could not import documents into database ${DB_NAME}`);
    console.error(err);
    
}