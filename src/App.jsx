import { useState } from "react";
import axios from "axios";

export default function App() {
  const url = "http://localhost:3333/politicians";
  const [politicians, setPoliticians] = useState([]);

  // richiesta get api
  axios.get(url)
    .then(res => setPoliticians(res.data))
    .catch(err => console.error(err))

  return (
    <>
      <h1>Lista politici</h1>

      <div className="container">
        {
          politicians.map((p, i) => {
            return (
              <div className="card" key={i}>
                <h3>{p.name}</h3>

                <figure>
                  <img src={p.image} alt={`Foto di ${p.name}`} />
                </figure>

                <span>{p.position}</span>

                <p>{p.biography}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}