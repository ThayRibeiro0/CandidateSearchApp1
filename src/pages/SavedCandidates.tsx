import { useState, useEffect } from 'react';
// import './Saved.Candidates.css';  // Certifique-se de ter importado o arquivo CSS
import { Candidate } from '../interfaces/Candidate.interface';  // Importando o tipo Candidate

const SavedCandidates = () => {
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
    <section className="saved-candidates-section">
      <h1 className="title">Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p className="no-candidates">No saved candidates.</p>
      ) : (
        <table className="candidates-table">
          <thead>
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
              <tr key={candidate.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>
                  <img 
                    src={candidate.avatar_url} 
                    alt="Avatar" 
                    className="candidate-avatar1" 
                  />
                </td>
                <td className='name'>{candidate.login || 'No name available'}</td>
                <td className='location'>{candidate.location || 'No location available'}</td>
                <td className='email'>{candidate.email ? (
                  <a href={`mailto:${candidate.email}`} className="candidate-email">{candidate.email}</a>
                ) : 'No email available'}</td>
                <td className='company'>{candidate.company || 'No company available'}</td>
                <td>{candidate.bio || 'No bio available'}</td>
                <td className='reject-btn1'>
                  <button 
                    className="reject-btn" 
                    onClick={() => handleReject(index)}
                  >
                    −
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
