import React from "react";

function WeatherHeading() {
  const backgroundImageStyle = {
    backgroundImage: `url("https://etimg.etb2bimg.com/photo/100415970.cms")`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  };

  return (
    <div style={backgroundImageStyle} className="text-2xl font-bold text-blue-900 py-4">
      <div className="bg-opacity-75 bg-black p-2">
        <div className="text-white">
          Summer Wander
          <p className="text-sm font-medium">Discover Your Perfect Destination for the Vacations</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherHeading;
