import { Testimonial } from "../models/testimoniales.js";

const guardarTestimoniales = async (req, res)=>{
    console.log(req.body); //Objeto con la informacion del formulario

    // Validar...
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim()===""){
        errores.push({mensaje: 'El Nombre esta vacio'})
    }
    if(correo.trim()===""){
        errores.push({mensaje: 'El Correo esta vacio'})
    }
    if(mensaje.trim()===""){
        errores.push({mensaje: 'El Mensaje esta vacio'})
    }

    // Si al menos un campo esta vacio..
    if(errores.length > 0){
        const testimoniales = await Testimonial.findAll();
        // Mostrar la vista con errores (mensajes de campo vacio)
        res.render('testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        // Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimoniales
}