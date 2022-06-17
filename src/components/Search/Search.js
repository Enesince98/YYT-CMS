import React from 'react'
const Search = () => {
  return (
    <div><form>
    <label htmlFor="search">Search</label>
    <input id="search" type="search" pattern=".*\S.*" required/>
    <span className="caret"></span>
  </form></div>
  )
}

export default Search