import { useMemo, useState, memo, useEffect } from "react";
import axios from "axios";

// componente card
const Card = memo(({ politician }) => {
  console.log("Render Card:", politician.name);
  return (
    <div className="card">
      <div className="card-content">
        <h3>{politician.name}</h3>
        <figure>
          <img src={politician.image} alt={`Foto di ${politician.name}`} />
        </figure>
        <span>{politician.position}</span>
        <p>{politician.biography}</p>
      </div>
    </div>
  );
});

export default function App() {
  const url = "http://localhost:3333/politicians";
  const [politicians, setPoliticians] = useState([]);
  const [query, setQuery] = useState("");

  // richiesta get api
  useEffect(() => {
    axios.get(url)
      .then(res => setPoliticians(res.data))
      .catch(err => console.error(err))
  }, [url])

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
          filteredArray.map((p) => (
            <Card key={p.id} politician={p} />
          ))
        }
      </div>
    </>
  )
}