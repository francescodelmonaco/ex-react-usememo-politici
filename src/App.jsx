import { useMemo, useState } from "react";
import axios from "axios";

export default function App() {
  const url = "http://localhost:3333/politicians";
  const [politicians, setPoliticians] = useState([]);
  const [query, setQuery] = useState("");

  // richiesta get api
  axios.get(url)
    .then(res => setPoliticians(res.data))
    .catch(err => console.error(err))

  // array filtrato dopo la ricerca
  const filteredArray = useMemo(() => {
    return politicians.filter(p => {
      return p.name.toLowerCase().includes(query.toLowerCase()) || p.biography.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, politicians]);

  return (
    <>
      <h1>Lista politici</h1>


      <div className="container">

        <input
          type="text"
          placeholder="Cerca il nome o la biografia del politico"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {
          filteredArray.map((p, i) => {
            return (
              <div className="card" key={i}>
                <div className="card-content">
                  <h3>{p.name}</h3>

                  <figure>
                    <img src={p.image} alt={`Foto di ${p.name}`} />
                  </figure>

                  <span>{p.position}</span>

                  <p>{p.biography}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}