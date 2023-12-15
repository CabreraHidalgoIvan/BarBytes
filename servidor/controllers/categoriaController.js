const Categoria = require('../models/Categoria');

// Metodos GET
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(201).json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: 'No existe la categoría' });
    }

    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos POST
exports.crearCategoria = async (req, res) => {
  try {
    let categoria;

    // Crea la nueva categoría
    categoria = new Categoria(req.body);

    // Guarda la categoría
    await categoria.save();

    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos PUT
exports.actualizarCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, img, estado } = req.body;
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      res.status(404).json({ msg: 'No existe la categoría' });
    }

    categoria.nombre = nombre;
    categoria.descripcion = descripcion;
    categoria.img = img;
    categoria.estado = estado;

    categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      categoria,
      { new: true }
    );

    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Metodos DELETE
exports.eliminarCategoria = async (req, res) => {
  try {
    let categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
     return res.status(404).json({ msg: 'No existe la categoría' });
    }

    await Categoria.findOneAndDelete({ _id: req.params.id });

    return res.status(201).json({ msg: 'Categoría eliminada' });
  } catch (error) {
    console.log(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'ID de plato no válido' });
    }
    return res.status(500).send('Hubo un error');
  }
};
