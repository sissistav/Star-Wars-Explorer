import { Link } from "react-router-dom";
import { Card } from 'primereact/card';

const Homepage = () => {
  const cardStyle = "w-full md:w-[300px] text-center cursor-pointer hover:scale-105 transition-transform"
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#19eefd] text-2xl md:text-4xl pt-10 pb-20 text-center px-4">
        <p>A long time ago in a galaxy far,</p>
        <p>far away....</p>
      </div>
      <div className="flex flex-col md:flex-row justify-around gap-4 w-full px-4">
        <Link to='/films' className="w-full md:w-auto">
          <Card title="Films" className={cardStyle} />
        </Link>
        <Link to='/characters' className="w-full md:w-auto">
          <Card title="Characters" className={cardStyle} />
        </Link>
        <Link to='/favourites' className="w-full md:w-auto">
          <Card title="Favourites" className={cardStyle} />
        </Link>
      </div>
    </div>
  );
};

export default Homepage;