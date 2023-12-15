const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  estado: {
    type: String,
    trim: true,
    default: 'Desactivado',
  },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
