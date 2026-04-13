import { BASE_URL } from "../api/BaseApi";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/tournament");
        setTournaments(res.data.Tournaments);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // open popup
  const handleJoinClick = (tournament) => {
    setSelectedTournament(tournament);
    setShowPopup(true);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        BASE_URL + `/participant/submit/${selectedTournament._id}`,
        formData
      );

      alert("Successfully Joined Tournament");
      setShowPopup(false);
      setFormData({ name: "", location: "", phone: "" });
    } catch (err) {
      alert("Error joining tournament");
    }
  };

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
              <button
                className="card-btn"
                onClick={() => navigate(`/result/${t._id}`)}
              >
                View Result
              </button>

              <button
                className="card-btn"
                onClick={() => handleJoinClick(t)}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Join Tournament</h3>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
              />

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;