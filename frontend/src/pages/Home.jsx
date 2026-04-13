import { BASE_URL } from "../api/BaseApi";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/tournament");
        console.log("response is :- ", res);
        setTournaments(res.data.Tournaments);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <div className="card-conntainer">
        {tournaments.map((t) => (
          <div key={t._id} className="card">
            <img src={t.imageUrl?.[0]} alt={t.title} className="card-image" />

            <div className="card-text">
              <h3 className="card-title">{t.title}</h3>

              <p className="card-para">
                📅 {t.startedFrom} → {t.endsOn}
              </p>

              <p className="card-des">{t.description?.slice(0, 80)}...</p>
            </div>

            <div className="card-button">
              <span className="badge">{t.category || "Open"}</span>

              <button className="card-btn">Join</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
