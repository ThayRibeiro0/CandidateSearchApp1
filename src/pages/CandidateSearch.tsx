import { useEffect, useState } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearch.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      console.log(data);
      setCandidates(data);
    };
    fetchCandidates();
  }, []);
  

  const handleSaveCandidate = () => {
    const candidate = candidates[currentIndex];
  
    // Garante que sempre obtenha um array válido do localStorage
    let savedCandidates = [];
    try {
      const storedData = localStorage.getItem('savedCandidates');
      savedCandidates = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Erro ao carregar candidatos salvos:', error);
      savedCandidates = [];
    }
  
    const isAlreadySaved = savedCandidates.some((saved: Candidate) => saved.id === candidate.id);
  
    if (!isAlreadySaved) {
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log('Candidate saved:', candidate);
      navigate('/potentialcandidates'); 
    } else {
      alert('Este candidato já está salvo!');
    }
  };
  

  const handleSkipCandidate = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 < candidates.length) {
        return prevIndex + 1;
      } else {
        alert("No more candidates available.");
        return prevIndex;  // Stay on the last candidate
      }
    });
  };
  

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="candidate-search-container">
      <h1 className="title">Candidate Search</h1>
      {currentCandidate ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt="Avatar" className="candidate-avatar" />
          <div className="candidate-info">
            <h2>{currentCandidate.login} ({currentCandidate.name})</h2>
            <div className="candidate-details">
              <p>Location: {currentCandidate.location ? currentCandidate.location : 'No location available'}</p>
              <p>
                Email:
                {currentCandidate.email ? (
                  <a href={`mailto:${currentCandidate.email}`} className="email-link">
                    {currentCandidate.email}
                  </a>
                ) : (
                  'No email available'
                )}
              </p>
              <p>Company: {currentCandidate.company ? currentCandidate.company : 'No company available'}</p>
              <p>Bio: {currentCandidate.bio ? currentCandidate.bio : 'No bio available'}</p>
              <p>
                GitHub Profile:
                <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                  {currentCandidate.login}'s GitHub
                </a>
              </p>
            </div>
          </div>

          <div className="candidate-buttons">
            <button onClick={handleSkipCandidate} className="skip-button">
              -
            </button>
            <button onClick={handleSaveCandidate} className="save-button">
              +
            </button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;