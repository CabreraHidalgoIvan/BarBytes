const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    hora_pedido:{
        type: Date,
        default: Date.now
    },
    fecha_pedido:{
      type: Date,
      default: Date.now
    },
    estado_pedido:{
        type: String,
        
    },
    id_cliente:[
        {
          type: mongoose.Schema.Types.ObjectId,
          
          ref: 'Usuario',
        },
      ],
    lista_platos_ordenados:[
        {
          type: mongoose.Schema.Types.ObjectId,
          
          ref: 'Plato',
        },
      ],
    mesa:{
        type: Number,
        required: true
    },
    precioTotal:{
        type: Number,
        required: true
    },
    comentarios:{
        type: String
    }
})

module.exports = mongoose.model("Pedidos", PedidoSchema);