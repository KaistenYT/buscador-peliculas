import {React , useState} from 'react'

export const BuscaorPeliculas = () => {
 const urlBase = 'https://api.themoviedb.org/3/search/movie'
 const API_KEY = 'API_KEY'
const [busqueda, setBusqueda] = useState('')
const [peliculas, setPeliculas] = useState([])


const handleInputChange= (e)=>{
  setBusqueda(e.target.value)
}

const handleSubmit=(e) =>{
  e.preventDefault()
  fetchPeliculas()
}
const fetchPeliculas = async ()=>{
  try{
    const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
    const data = await response.json()
    console.log(data.results)
    setPeliculas(data.results)
  }catch(error){
    console.error('Ha ocurrido un error ', error)
  }
}

  return (
    <div>
      <h1 className='tittle'>Buscador Peliculas</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder='Escribi el nombre de una pelicula'
        value={busqueda}
        onChange={handleInputChange}/>
        <button type='submit'>Buscar</button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
            <p>{parseInt(pelicula.vote_average)}</p>
            <p>{pelicula.original_language}</p>
            
          </div>

        ))}
    </div>
    </div>

    
  )
}
export default BuscaorPeliculas;
