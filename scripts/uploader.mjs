

export async function dropTable(tName){
    pool.query(`DROP TABLE IF EXISTS ${tName};`).then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results.command);
        }
    });
}

export async function createPoolsTable(){
    pool.query(`CREATE TABLE IF NOT EXISTS pools  (
      pool varchar(100) NOT NULL PRIMARY KEY,
      token0 varchar(100) NOT NULL,
      token1 varchar(100) NOT NULL,
      symbol varchar(20) NOT NULL,
      total_supply varchar(100) NOT NULL,
      reserve0 varchar(100) NOT NULL,
      reserve1 varchar(100) NOT NULL,
      liquidity varchar(100) NOT NULL
    );`).then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results.command);
        }
    });
}

export async function addPool(
  pool_addr, token0, token1, symbol, ts, reserve0, reserve1, liquidity
  ){
    await pool.query(`
    INSERT INTO pools
    VALUES ('${pool_addr}', '${token0}', '${token1}',
    '${symbol}', '${ts}', '${reserve0}', '${reserve1}', '${liquidity}');
    `)
    .then((results, error) => {
        if (error) {
          console.log(error);
        } else {
        console.log(results.command); 
        }
    });
}
