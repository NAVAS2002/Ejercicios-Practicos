import {useState, useEffect} from 'react';

function App() {

  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState('');

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch('http://localhost:3000/productos');
        
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }

        const datos = await response.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);  
      }
    }

    fetchProductos();
  }, []);

  const FiltrarProductos = productos.filter((producto) => {
    return producto.nombre.toLowerCase().includes(buscar.toLowerCase());
  });

  return (
    <main>
      <h1>Catálogo de Productos</h1>
      <input
        type="text"
        placeholder="Buscar producto"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
      />
      <p>Productos {productos.length}</p>
      <ul>
        {FiltrarProductos.map((producto) => (
          <li key={producto._id}>
            <h2>{producto.nombre}</h2>
            <p>Precio: ${producto.precio}</p>
            <p>Descripción: {producto.descripcion}</p>
            <p>categoria: {producto.categoria}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;