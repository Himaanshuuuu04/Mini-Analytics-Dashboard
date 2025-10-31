import { Link } from "react-router";
import '../styles/home.scss'
import Card from "../components/card";
import Button from "../components/button";
function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <Card>
      <div className="flex flex-col items-center justify-center m-2">
        
      <h1 className="text-4xl font-bold text-gray-900 ">
        Journalyst
      </h1>
      
      <p className="mask-radial-from-neutral-900  text-xl ">
        Track, analyze, and improve your trading performance
      </p>
      </div>
      <div>
      <Link
        to="/dashboard"
        className="flex items-center justify-center "
      >
       <Button className=" flex items-center justify-center px-4">
         
         <span className="text-lg">View Dashboard</span>
       </Button>
      </Link>
      </div>
      </Card>
    </div>
  );
}

export default Home;
