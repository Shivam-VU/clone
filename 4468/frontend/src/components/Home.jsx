import React, { useEffect, useState } from 'react';
import serverurl from '../constants/serverurl';
import { Link } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState("");

  // Fetch /api/getuser and load user name
  useEffect(() => {
    const updateName = async () => {
      try {
        const response = await fetch(`${serverurl}/api/getuser`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        
        const data = await response.json();
        console.log(data);
        setUserName(data.firstName+" "+data.lastName || "Unknown User");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    updateName();
  }, []);

  return (
    <div className="container vh-100">
      <p>Welcome, {userName}</p>
      {/* text red */}
      <Link to="/internationalform" className='text-danger '>Registration form for international students</Link>
    </div>
  );
};

export default Home;
