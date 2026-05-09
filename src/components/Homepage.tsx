import { Link } from "react-router-dom";

import { Card } from 'primereact/card';

const Homepage = () => {

  return (
    <>
      <div className="flex justify-around">
        <Link to='/films'>
          <Card
            title="Films"
          />
        </Link>
        <Link to='/characters'>
          <Card
            title="Characters"
          />
        </Link>
        <Link to='/favourites'>
          <Card
            title="Favourites"
          />
        </Link>
      </div>
    </>
  );
};

export default Homepage;