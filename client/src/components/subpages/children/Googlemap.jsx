import React from 'react';

const Googlemap = ({ place }) => {
  const encodedAddress = encodeURIComponent(place);
  const mapUrl = `https://www.google.com/maps/embed?pb=&q=${encodedAddress}`;

  return (
    <div>
      <iframe
      className='rounded'
        src={mapUrl}
        style={{ border: 0, width: '100%', height: '390px' }}
        allowFullScreen
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Googlemap;
