import { useState, useEffect } from "react";
import "./PotentitalCandidates.css";

const SavedCandidates = () => {
  interface Candidate {
    id: number;
    avatar_url: string;
    login: string;
    location: string | null;
    email: string | null;
    company: string | null;
    bio: string | null;
  }

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("savedCandidates");
      let storedCandidates: Candidate[] = [];

      try {
        storedCandidates = storedData ? JSON.parse(storedData) : [];
      } catch (error) {
        console.error("Erro ao carregar candidatos salvos:", error);
        localStorage.removeItem("savedCandidates"); // Limpa os dados corrompidos
      }

      setSavedCandidates(storedCandidates);

      const parsedData = storedData ? JSON.parse(storedData) : [];
      setSavedCandidates(Array.isArray(parsedData) ? parsedData : []);
    } catch (error) {
      console.error("Erro ao carregar candidatos salvos:", error);
      setSavedCandidates([]); // Define como array vazio caso haja erro
    }
  }, []);

  const handleReject = (id: number) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== id
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        <table className="candidates-table">
          <thead className="table-header">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate: Candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img
                    className="candidate-avatar"
                    src={candidate.avatar_url}
                    alt="Avatar"
                  />
                </td>
                <td>{candidate.login || "No name available"}</td>
                <td>{candidate.location || "No location available"}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`} className="email-link">
                      {candidate.email}
                    </a>
                  ) : (
                    "No email available"
                  )}
                </td>
                <td>{candidate.company || "No company available"}</td>
                <td className="bio-cell">
                  {candidate.bio || "No bio available"}
                </td>
                <td>
                  <button
                    onClick={() => handleReject(candidate.id)}
                    className="reject-button"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SavedCandidates;
