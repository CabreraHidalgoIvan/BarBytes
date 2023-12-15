const mongoose = require('mongoose');

const PlatoSchema = mongoose.Schema({
  categoriaId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: 'Categoria',
    },
  ],
  categoriaId2: [
    {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: 'Categoria',
    },
  ],
  categoriaId3: [
    {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: 'Categoria',
    },
  ],
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  estado: {
    type: String,
    trim: true,
    default: "Desactivado"
  },
});

module.exports = mongoose.model('Plato', PlatoSchema);
