import mysql from 'mysql'
const conectar=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123gonza',
    database:'criticas'
});
conectar.connect(function(err){
if(err){
    console.error('error en la conexion'+err.stack)
    return;
}
console.log('conexion exitosa id:'+conectar.threadId);
})

export{conectar};