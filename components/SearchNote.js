import { useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon , BookLogo } from "./PageIcons";

const SearchNote = () => {

    const {push, query} = useRouter()

    const [searchInput, setSearchInput] = useState(query.search? query.search : '')

    const searchNote = () => {
        return searchInput.includes('#')? push(`/notes/${searchInput.slice(1)}`) : push(searchInput? '/notes?search='+searchInput : '/notes');
    }

    return (
        <div className="searchNote">
            <div data-search-opt
                onClick={() => push('/notes')}    
            >
                <BookLogo/>
            </div>
            <input
                type="text"
                placeholder="Buscar.."
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }}
                onKeyPress={(e) => {
                    e.key === "Enter" && searchNote()
                }}
                defaultValue = {searchInput}
            />
            <div
                data-search-opt
                onClick={() => {
                    searchNote()
                }}>
                <SearchIcon/>
            </div>
        </div>
    );
};

export default SearchNote;
