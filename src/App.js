import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = () => {
    setLoading(true);
    axios.get('https://api.adviceslip.com/advice')
      .then(res => {
        setAdvice(res.data.slip.advice);
      })
      .catch(err => {
        setError(err); 
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="container">
      <div className="card">
        {error && <div>Error: {error.message}</div>}
        <h1>{advice}</h1>
        <button onClick={fetchAdvice} disabled={loading}>
          {loading ? 'Loading...' : 'Get an advice'}
        </button>
      </div>
    </div>
  );
}

export default App;
