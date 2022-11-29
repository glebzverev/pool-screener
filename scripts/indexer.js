require("dotenv").config();
const DEX = require("../DEX.json");
const abi = ethers.utils.defaultAbiCoder;

async function getPools(factory){
  let pairsLen = await factory.allPairsLength()
  pairAddresses = [];
  for (var i = 0; i < pairsLen / 10000; i++){
    let _pairAddress = await factory.allPairs(i)
    pairAddresses.push(_pairAddress)
  }
  return pairAddresses;
}

async function getPoolInfo(pools){
  for (var i in pools){
    let pair = await ethers.getContractAt("IUniswapV2Pair", pools[i]); //Uniswap
    await pair.token0().then(console.log);
    await pair.token1().then(console.log);
    await pair.symbol().then(console.log);
    await pair.totalSupply().then(console.log);
    await pair.kLast().then(console.log);
  }
}

async function main() {

  [deployer] = await ethers.getSigners();
  ownerAddress = await deployer.getAddress();
  console.log(ownerAddress)
  console.log(DEX);

  const factory = await ethers.getContractAt("IFactory", DEX["Uniswap"]); //Uniswap

  const pools = await getPools(factory)  
  await getPoolInfo(pools)
  
  // console.log(pairAddresses);

};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});