import { React, useState } from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log ('Search query: ${searchQuery}');
    };

    return (
        <div>
            <h1> Mindful App </h1>
            <p> This is still a testing HomePage </p>
            <div>
                <h2>Search</h2>
                    <div>
                        <input
                        type="text"
                        placeholder="Search for Products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <h2>Explore more products</h2>

                    <Link to="/login"> Got to Login </Link>
            </div>
        </div>
        
    );
}

export default HomePage;
