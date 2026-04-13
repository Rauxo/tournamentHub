import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../api/BaseApi";

function Result() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          BASE_URL + `/result/${id}`
        );
        setResults(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Layout>
      <div className="result-container">
        <h2>🏆 Tournament Leaderboard</h2>

        {results.length === 0 ? (
          <p>No Results Available</p>
        ) : (
          <table className="result-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Team Name</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {results.map((r) => (
                <tr key={r._id}>
                  <td className="pos">{r.position}</td>
                  <td>{r.teamname}</td>
                  <td>{r.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default Result;