import express from 'express'
import { conectar } from '../modelo/db_conectar.js'
const crud_post=({});
crud_post.leer=(req,res)=>{
    const sql = 'select * from criticas';
    conectar.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.render('vista.ejs', { data: result });
    });
    
}
crud_post.crear = (req, res) => {
    const { nombre, genero, calificacion, opinion, imagen } = req.body;
  
  
    conectar.query(
      'INSERT INTO criticas (nombre, genero, calificacion, opinion, imagen) VALUES (?, ?, ?, ?, ?)',
      [nombre, genero, calificacion, opinion, imagen],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error al crear el post.');
        } else {
          res.redirect('/');
        }
      }
    );
  };

  crud_post.eliminar = (req, res) => {
    const postId = req.params.postId; 

    conectar.query('DELETE FROM criticas WHERE id = ?', [postId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el post.');
      } else {
        res.redirect('/');
      }
    });
  };




export{crud_post}