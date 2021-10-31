import React, { useState } from 'react';
import './search-bar.scss';

type Props = {
    onSubmit: (title: string) => void;
}

let timeout: ReturnType<typeof setTimeout>;
const SearchBar = ({ onSubmit }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [lastSearch, setLastSearch] = useState<string>('');

    /* handle search bar input */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value)

        /* Submit search query with a 500ms delay */
        clearTimeout(timeout);
        if (value !== lastSearch) {
            timeout = setTimeout(() => {
                setLastSearch(value);
                onSubmit(value);
            }, 500)
        }
    }

    return (
        <div className="search-bar">
            <input
                value={title}
                onChange={handleSearch}
                type="text"
                placeholder="Search by title"
            />
        </div>
    )
}

export default SearchBar;