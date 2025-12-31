import { useState } from 'react';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = 'Search games...' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={!searchTerm.trim()}>
        <Search size={20} />
      </button>
    </form>
  );
};
