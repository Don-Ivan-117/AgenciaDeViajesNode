import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/testimoniales.js";

const paginaInicio = async (req, res) => { // Cuando se inicie la aplicacion
  //req: La informacion que estamos enviando. res - Lo que express nos respnde

  const proimiseDB = [];

  proimiseDB.push( Viaje.findAll({limit: 3}));
  proimiseDB.push( Testimonial.findAll({limit : 3}));


  // Consultar solo 3 viajes de los muchos que hay en la base de datos para mostrarlos en la vista. Tameremos la consulta como una promesa pues no sabemos el tiempo que tardara (al usar async lo mejor es encerrarlo en un try-catch)
  // Nota: Al usar async y por ende try catch la vista o el metodo render se debera colocar dentro del try
  try {
    
    const resultado = await Promise.all(proimiseDB);

    res.render('inicio', {pagina : 'Inicio', clase: 'home',viajes: resultado[0], testimoniales: resultado[1]});

  } catch (error) {
    console.log(error);
  }

  }

const paginaNosotros = (req, res) => { //Cuando se visite la ruta llamada nostros
    res.render("nosotros", { pagina : 'Nosotros' }); //Render carga una vista. En este caso busca en la carpeta 'views' un archivo llamado 'nosotros'
  }

const paginaViajes = async (req, res) => {

  // Consultar la base de datos
  const viajes = await Viaje.findAll();
  console.log(viajes);

    res.render("viajes", { pagina : 'Próximos viajes', viajes }); 
  }

const paginaTestimoniales = async (req, res) => {

  try {
    // Acceder a la base de datos y traernos todos los valores de la tabla de testimoniales
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", { pagina : 'Testimoniales', testimoniales }); 
  } catch (error) {
    console.log(error);
  }

  }

  // Muestra los detalles de cada viaje
  const paginaDetalleViaje= async (req, res) =>{
    const {id} = req.params;

    try {
      // Busca en la table "slug" de  base de datos un solo elemento y se lo asigna a "resultado". El elemento que busca es que que se parezca a id
      const resultado = await Viaje.findOne({where : {slug: id}});

      res.render("viaje", {pagina:"Informacion viaje", viaje : resultado})
    } catch (error) {
      console.log(error);
    }
  }

export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}