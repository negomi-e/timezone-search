
import React, { useState} from "react";
import './Search.css';


const Search = (props) =>{
  const [searchValue, setSearchValue] = useState('');
  
  const handleInputChanges = (e) => {
    setSearchValue(e.target.value);
    props.search(searchValue);
  }

  
  return (
    <div className="container">
    <form className="search">
    <div className="icon">
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9.84211" cy="9.84211" r="9.09211" stroke="#5C5C5C" stroke-width="1.5"/>
<line x1="17.2712" y1="16.2105" x2="22" y2="20.9393" stroke="#5C5C5C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      {/* <div className="ellipsis">
      </div>
      <div className="lineMagnify"></div> */}
    </div>
    <input
    placeholder="Search"
      value={searchValue}
      onChange={handleInputChanges}
      type="text"
    />
  </form>
  </div>
  );
}

export default Search;