// En este archivo se coloca todo lo relacionado a las rutas
import express from "express";
import {
  paginaInicio,
  paginaNosotros,
  paginaTestimoniales,
  paginaViajes,
  paginaDetalleViaje,
} from "../controllers/paginasController.js";
import { guardarTestimoniales } from "../controllers/testimonialController.js";

// Como ya existe una inicializacion de express en el archivo (index.js linea 6) debemos seguir usando esa, para eso debemos extenderla con .Router()
const router = express.Router();

// Forma con controllador
router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/viajes", paginaViajes);

router.get("/viajes/:id", paginaDetalleViaje);

router.get("/testimoniales", paginaTestimoniales);

router.post("/testimoniales", guardarTestimoniales);

// Exportar todas las rutas
export default router;
