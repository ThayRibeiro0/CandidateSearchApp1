import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    
    // Get existing saved candidates from localStorage, or initialize an empty array
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    
    // Check if the candidate already exists in localStorage to avoid duplicates
    const isAlreadySaved = savedCandidates.some((saved: Candidate) => saved.id === candidate.id);
    
    if (!isAlreadySaved) {
      // Add candidate to the saved list
      savedCandidates.push(candidate);
      
      // Save updated list back to localStorage
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log('Candidate saved:', candidate);
      
      // Move to the next candidate
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('This candidate is already saved!');
    }
  };

  const handleSkipCandidate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="candidate-search-container">
      <h1 className="title">Candidate Search</h1>
      {currentCandidate ? (
        <div className="candidate-card">
          <img
            src={currentCandidate.avatar_url}
            alt="Avatar"
            className="candidate-avatar"
          />
          <div className="candidate-info">
            <h2>{currentCandidate.login} ({currentCandidate.name})</h2>
            <div className="candidate-details">
              <p>Location: {currentCandidate.location ? currentCandidate.location : 'No location available'}</p>
              <p>Email: 
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
            <button onClick={handleSkipCandidate} className="skip-button">-</button>
            <button onClick={handleSaveCandidate} className="save-button">+</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;