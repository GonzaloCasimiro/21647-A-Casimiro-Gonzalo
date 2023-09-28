import express from "express";
import { crud_post } from "./controlador/posts.js";
import { conectar } from './modelo/db_conectar.js';
const app_e=express();
app_e.use(express.static('public'));
app_e.use(express.urlencoded({extended:false}));
app_e.use(express.json());
app_e.use(express.static('./vista'))
app_e.use(express.static('./controlador'))
app_e.use(express.static('./modelo'))
//motor vistas
app_e.set('views','./vista');
app_e.set('view engine','ejs');


//render ejs
app_e.get('/', crud_post.leer);

//app_e.post('/crear',crud_post.cud);
app_e.post('/crear', crud_post.crear); 
app_e.post('/eliminar/:postId', crud_post.eliminar);

  app_e.get('/editar/:postId', (req, res) => {
    const postId = req.params.postId;
  
    const sql = 'SELECT * FROM criticas WHERE id = ?';
    conectar.query(sql, [postId], (error, results) => {
      if (error) {
        console.error(error);

        res.status(500).send('Error al obtener los datos de la película.');
      } else {
        if (results.length > 0) {
          const pelicula = results[0]; 
          res.render('editar', { pelicula });
        } else {
          res.status(404).send('Película no encontrada.');
        }
      }
    });
  });

  app_e.post('/editar/:postId', (req, res) => {
    const postId = req.params.postId;
    const { calificacion, genero, opinion } = req.body;
    const sql = 'UPDATE criticas SET calificacion = ?, genero = ?, opinion = ? WHERE id = ?';
    conectar.query(sql, [calificacion, genero, opinion, postId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al actualizar los datos de la película.');
      } else {
        res.redirect('/');
      }
    });
  });

app_e.listen('5005',()=>{
    console.log('APP inicianda en: http://localhost:5000/')
})

