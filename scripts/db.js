require("dotenv").config();
const bytea = require('postgres-bytea')
// const ethers = require("@nomiclabs/hardhat-ethers");
// const abi = ethers.utils.defaultAbiCoder;
readable.pipe(new bytea.Encoder())

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'superDEX',
  password: 'password',
  port: 5432,
});
 

// Uint8Array [ 97, 98, 99 ]

async function dropTable(tName){
    pool.query(`DROP TABLE IF EXISTS ${tName};`).then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results.command);
        }
    });
}

async function createPoolsTable(){
    pool.query(`CREATE TABLE IF NOT EXISTS pools  (
        DEX varchar(20) NOT NULL,
        address bytea NOT NULL PRIMARY KEY
    );`).then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results);
        }
    });
}

async function addPool(s1, s2){
    pool.query(`
    INSERT INTO pools
    VALUES (${s1}, ${s2});
    `)
    .then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results); 
        }
    });
}

async function main(){
    await dropTable("pools")
    let utf8Encode = new TextEncoder();
    utf8Encode.encode("abc");
    await createPoolsTable()
    // const address = abi.encode(["address"], ["0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"])
    const address = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    console.log(address)
    // const content = bytea.decode(address)
    // console.log(content)
    await addPool('uniswap', utf8Encode.encode(address));
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });