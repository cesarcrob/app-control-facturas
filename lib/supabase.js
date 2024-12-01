import { createClient } from '@supabase/supabase-js'

// Conexión a Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Función para obtener las facturas
export const getFacturas = async () => {
  const { data, error } = await supabase
    .from('facturas')
    .select('id, nombreCliente, celular, fecha, cantidad, estatus')

  if (error) {
    console.error('Error al obtener facturas:', error)
    return []
  }

  return data
}

// Función para crear una nueva factura
export const createFactura = async (factura) => {
  const { cliente, celular, cantidad, estatus } = factura
  const fecha = new Date().toISOString().split('T')[0] // Formato: 'YYYY-MM-DD'

  const { data, error } = await supabase
    .from('facturas')
    .insert([
      {
        nombreCliente: cliente,
        celular: celular,
        cantidad: parseFloat(cantidad),
        estatus: estatus,
        fecha: fecha,
      },
    ])

  if (error) {
    console.error('Error al crear factura:', error.message)
    alert(`Error al crear la factura: ${error.message}`)
    return null
  }

  if (!data || data.length === 0) {
    console.error('Error: la respuesta de Supabase no contiene datos válidos.')
    return null
  }

  return data[0]
}

// Función para actualizar una factura
export const updateFactura = async (id, factura) => {
  const { nombreCliente, celular, cantidad, estatus, fecha } = factura

  // Validamos que los campos necesarios estén presentes y sean válidos
  if (!nombreCliente || !celular || isNaN(cantidad) || !estatus || !fecha) {
    console.error('Error: Falta información necesaria para actualizar la factura.')
    return null
  }

  console.log('Factura a actualizar:', factura) // Verifica qué datos estás enviando

  const { data, error } = await supabase
    .from('facturas')
    .update({ nombreCliente, celular, cantidad, estatus, fecha }) // Actualizamos los valores
    .eq('id', id) // Filtramos por el ID de la factura a actualizar

  if (error) {
    console.error('Error al actualizar factura:', error)
    return null
  }

  // Verificamos si 'data' es null o vacío
  if (!data || data.length === 0) {
    console.error('No se actualizó ninguna factura. Verifique si el ID es correcto o si los datos son diferentes.')
    return null
  }

  console.log('Factura actualizada:', data) // Verifica los datos actualizados
  return data[0]
}

// Función para eliminar una factura
export const deleteFactura = async (id) => {
  const { error } = await supabase
    .from('facturas')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar factura:', error)
    return false
  }

  return true
}

export default supabase
