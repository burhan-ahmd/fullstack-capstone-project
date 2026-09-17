import React, { useState, useEffect } from 'react';

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/gifts');
      const data = await response.json();
      setGifts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gifts:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading gifts...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Gifts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {gifts.map(gift => (
          <div key={gift._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <img src={gift.imageUrl} alt={gift.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3>{gift.title}</h3>
            <p><strong>Category:</strong> {gift.category}</p>
            <p><strong>Condition:</strong> {gift.condition}</p>
            <p><strong>Location:</strong> {gift.location}</p>
            <p>{gift.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftList;
