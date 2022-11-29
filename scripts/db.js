
require("dotenv").config();
const bn = require("@ethersproject/bignumber");

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'superDEX',
  password: 'password',
  port: 5432,
});
 
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
      address varchar(100) NOT NULL PRIMARY KEY,
      DEX varchar(20) NOT NULL
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
    INSERT INTO pools (address, dex)
    VALUES ('${s1}', '${s2}');
    `)
    .then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results.command); 
        }
    });
}


async function main(){
    await dropTable("pools")
    // await createPoolsTable()

    // const address = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6e".toLowerCase()
    // const address1 = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6a".toLowerCase()
    // const address2 = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6b".toLowerCase()
    // console.log(bn.BigNumber.from(address).toString())
    
    // await addPool(bn.BigNumber.from(address).toString(), String('uniswap'));
    // await addPool(bn.BigNumber.from(address1).toString(), String('uniswap'));
    // await addPool(bn.BigNumber.from(address2).toString(), String('uniswap'));

    // const results = await pool.query(`SELECT * FROM pools;`)
    // results.rows.forEach((e)=>{
    //   console.log(bn.BigNumber.from(e['address']).toHexString() == address);
    // })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });