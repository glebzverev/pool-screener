require("dotenv").config();
const DEX = require("../DEX.json");
// const abi = ethers.utils.defaultAbiCoder;
// const bn = require("@ethersproject/bignumber");
const bn = require("@ethersproject/bignumber");

import {watchPools} from "./watcher.mjs"
// const watcher = require("./watcher.js");

// import {createPoolsTable, dropTable, addPool} from "./uploader"

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'superDEX',
  password: 'password',
  port: 5432,
});
 
// async function dropTable(tName){
//     pool.query(`DROP TABLE IF EXISTS ${tName};`).then((results, error) => {
//         if (error) {
//           console.log(error);
//         } else {
//         console.log(results.command);
//         }
//     });
// }

// async function createPoolsTable(){
//     pool.query(`CREATE TABLE IF NOT EXISTS pools  (
//       pool varchar(100) NOT NULL PRIMARY KEY,
//       token0 varchar(100) NOT NULL,
//       token1 varchar(100) NOT NULL,
//       symbol varchar(20) NOT NULL,
//       total_supply varchar(100) NOT NULL,
//       reserve0 varchar(100) NOT NULL,
//       reserve1 varchar(100) NOT NULL,
//       liquidity varchar(100) NOT NULL
//     );`).then((results, error) => {
//         if (error) {
//           console.log(error);
//         } else {
//         console.log(results.command);
//         }
//     });
// }

// async function addPool(
//   pool_addr, token0, token1, symbol, ts, reserve0, reserve1, liquidity
//   ){
//     await pool.query(`
//     INSERT INTO pools
//     VALUES ('${pool_addr}', '${token0}', '${token1}',
//     '${symbol}', '${ts}', '${reserve0}', '${reserve1}', '${liquidity}');
//     `)
//     .then((results, error) => {
//         if (error) {
//           console.log(error);
//         } else {
//         console.log(results.command); 
//         }
//     });
// }

async function getPools(factory){
  let pairsLen = await factory.allPairsLength()
  pairAddresses = [];
  for (var i = 0; i < 10; i++){
    let _pairAddress = await factory.allPairs(i)
    pairAddresses.push(_pairAddress)
  }
  return pairAddresses;
}

async function getPoolInfo(pools){
  for (var i in pools){
    let pair = await ethers.getContractAt("IUniswapV2Pair", pools[i]); //Uniswap
    console.log(`----------------------------------------------------`)
    console.log(`pool address \t|\t ${pools[i]}`)
    
    let token0 = await pair.token0();
    console.log(`token0 address \t|\t ${token0}`);

    let token1 = await pair.token1();
    console.log(`token1 address \t|\t ${token1}`);
    
    let symbol = await pair.symbol();
    console.log(`symbol \t\t|\t ${symbol}`);
    let totalSupply = await pair.totalSupply()
    console.log(`total supply \t|\t ${totalSupply.toString()}`);

    let reserves = await pair.getReserves();
    let reserve0 = reserves['reserve0']
    console.log(`reserve0 \t|\t ${reserve0.toString()}`)
    let reserve1 = reserves['reserve1']
    console.log(`reserve1 \t|\t ${reserve1.toString()}`)
    let liquidity = reserve0.mul(reserve1) 
    console.log(`liquidity \t|\t ${liquidity}`);
    await addPool(
      bn.BigNumber.from(pools[i]).toString(),
      bn.BigNumber.from(token0).toString(),
      bn.BigNumber.from(token1).toString(),
      symbol, totalSupply.toString(),
      reserve0.toString(), reserve1.toString(), 
      liquidity.toString()
      )
  }
}

async function main() {
  // await createPoolsTable()

  // [deployer] = await ethers.getSigners();
  // ownerAddress = await deployer.getAddress();
  // console.log(ownerAddress)
  // console.log(DEX);


  // const factory = await ethers.getContractAt("IFactory", DEX["Uniswap"]); //Uniswap
  // const pools = await getPools(factory)  

  // await getPoolInfo(pools)

  console.log(module)

  console.log(watchPools())
  
  // await watcher.watchPools();

  // console.log(pairAddresses);

};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});