import { useState, useEffect } from 'react';

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

  // Carregar candidatos salvos do localStorage
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  // Função para rejeitar candidato (remover da lista)
  const handleReject = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, idx) => idx !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        <table className="candidates-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'black', color: 'white' }}>
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
            {savedCandidates.map((candidate: Candidate, index: number) => (
              <tr 
                key={candidate.id} 
                style={{ backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white' }}
              >
                <td>
                  <img 
                    src={candidate.avatar_url} 
                    alt="Avatar" 
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                  />
                </td>
                <td>{candidate.login || 'No name available'}</td>
                <td>{candidate.location || 'No location available'}</td>
                <td>{candidate.email ? (
                  <a href={`mailto:${candidate.email}`} style={{ color: 'blue' }}>{candidate.email}</a>
                ) : 'No email available'}</td>
                <td>{candidate.company || 'No company available'}</td>
                <td>{candidate.bio || 'No bio available'}</td>
                <td>
                  <button 
                    onClick={() => handleReject(index)} 
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
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
