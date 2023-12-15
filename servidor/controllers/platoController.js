const Plato = require('../models/Plato');
const Categoria = require('../models/Categoria');

// Metodos GET
exports.obtenerPlatos = async (req, res) => {
  try {
    const { sort, limit, categoriaNombre, categoriaNombre2, categoriaNombre3 } = req.query;

    let query = Plato.find();

    if (categoriaNombre3) {
      const categoria3 = await Categoria.findOne({ nombre: categoriaNombre3 });
      if (categoria3) {
        query = query.where('categoriaId3').equals(categoria._id);
      } else {
        return res.status(404).json({ msg: 'Categoría no encontrada' });
      }
    }

    query = query.populate('categoriaId3');

    if (categoriaNombre2) {
      const categoria2 = await Categoria.findOne({ nombre: categoriaNombre2});
      if (categoria2) {
        query = query.where('categoriaId2').equals(categoria._id);
      } else {
        return res.status(404).json({ msg: 'Categoría no encontrada' });
      }
    }

    query = query.populate('categoriaId2');

    if (categoriaNombre) {
      const categoria = await Categoria.findOne({ nombre: categoriaNombre });
      if (categoria) {
        query = query.where('categoriaId').equals(categoria._id);
      } else {
        return res.status(404).json({ msg: 'Categoría no encontrada' });
      }
    }

    query = query.populate('categoriaId');

    if (sort) {
      // Asumiendo que quieres ordenar por 'nombre'
      const sortOrder = sort === 'asc' ? 'nombre' : '-nombre';
      query = query.sort(sortOrder);
    }
    if (limit) {
      query = query.limit(Number(limit));
    }

    const platos = await query;

    if (!platos) {
      res.status(404).json({ msg: 'No existen platos' });
    }
    res.status(201).json(platos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerPlato = async (req, res) => {
  try {
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      res.status(404).json({ msg: 'No existe el plato' });
    }

    res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos POST

exports.crearPlato = async (req, res) => {
  try {
    let plato;

    // Crea la nueva categoría
    plato = new Plato(req.body);

    // Guarda la categoría
    await plato.save();

    res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos PUT

exports.actualizarPlato = async (req, res) => {
  try {
    const { nombre, descripcion, precio, img, categoriaId, categoriaId2, categoriaId3, estado } = req.body;
    let plato = await Plato.findById(req.params.id);

    if (!plato) {
      res.status(404).json({ msg: 'No existe el plato' });
    }

    plato.nombre = nombre;
    plato.descripcion = descripcion;
    plato.precio = precio;
    plato.img = img;
    plato.categoriaId = categoriaId;
    plato.categoriaId2 = categoriaId2;
    plato.categoriaId3 = categoriaId3;
    plato.estado = estado;

    // Guarda la categoría
    await plato.save();

    res.status(201).json(plato);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE

exports.eliminarPlato = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id);

    if (!plato) {
      return res.status(404).json({ msg: 'No existe el plato' });
    }

    await Plato.findOneAndDelete({ _id: req.params.id });
    return res.json({ msg: 'Plato eliminado con éxito' });

  } catch (error) {
    console.error(error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'ID de plato no válido' });
    }

    // Si llegamos aquí, ha habido un error no manejado
    return res.status(500).send('Hubo un error');
  }
};
