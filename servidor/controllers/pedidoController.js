const Pedido = require("../models/Pedido");
const Plato = require("../models/Plato");
const Usuario = require("../models/usuario");


// exports.obtenerPedidoPorNombre() = async (req, res) => {
// }

exports.crearPedido = async (req, res) => {
    try {
        let pedido;

        pedido = new Pedido(req.body);

        await pedido.save();
        res.send();
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerPedidos = async (req, res) => {
    try {
      const { sort, limit, platoNombre, platoPrecio, clienteNombre } = req.query;
  
      let query = Pedido.find();
  
      if (platoNombre) {
        const plato = await Plato.findOne({ nombre: platoNombre });
        if (plato) {
          query = query.where('lista_platos_ordenados').equals(plato._id);
        } else {
          return res.status(404).json({ msg: 'Plato no encontrada' });
        }
      }
      query = query.populate('lista_platos_ordenados');
      
      if (clienteNombre) {
        const cliente = await Usuario.findOne({ nombre: clienteNombre });
        if (cliente) {
          query = query.where('id_cliente').equals(cliente._id);
        } else {
          return res.status(404).json({ msg: 'Cliente no encontrada' });
        }
      }
  
      query = query.populate('lista_platos_ordenados');
      
  
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

// exports.obtenerPedidos = async (req, res) => {
//     try {
//         const pedidos = await Pedido.find();
//         res.json(pedidos)
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }
// }

exports.actualizarPedido = async (req, res) => {
    try {

        const {hora_pedido, estado_pedido, id_cliente, lista_platos_ordenados, mesa, precioTotal, comentarios} = req.body;
        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
            res.status(404).json({msg: 'No existe el pedido'})
        }

        pedido.hora_pedido = hora_pedido;
        pedido.estado_pedido = estado_pedido;
        pedido.id_cliente = id_cliente;
        pedido.lista_platos_ordenados = lista_platos_ordenados;
        pedido.mesa = mesa;
        pedido.precioTotal = precioTotal;
        pedido.comentarios = comentarios;


        pedido = await Pedido.findOneAndUpdate({_id: req.params.id}, pedido, {new: true} )
        res.json(pedido);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPedido = async (req, res) => {
    try {

        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
            res.status(404).json({msg: 'No existe el pedido'})
        }

        res.json(pedido);

        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}


exports.eliminarPedido = async (req, res) => {
    try {

        let pedido = await Pedido.findById(req.params.id);

        if(!pedido){
           return res.status(404).json({msg: 'No existe el pedido'})
        }

        await Pedido.findOneAndDelete({_id: req.params.id})
       return res.json({msg: 'pedido eliminado con exito'});
        // res.end();

        
    } catch (error) {
        console.log(error);

        if (error.kind === 'ObjectId') {
          return res.status(400).json({ msg: 'ID de pedido no válido' });
        }
       return res.status(500).send('Hubo un error');
    }
}