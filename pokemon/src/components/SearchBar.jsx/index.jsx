function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-6 w-64 rounded-lg border-2 border-gray-300 p-2"
    />
  );
}

export default SearchBar;
