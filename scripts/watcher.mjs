import pkg from 'pg';
const Pool = pkg.Pool
// export { watchPools as default };

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'superDEX',
    password: 'password',
    port: 5432,
  });


async function watchPools(){
    await pool.query('SELECT * FROM pools;').then((res)=>{
        console.log(res.rows)
        })
    } 

 export {watchPools}