import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

interface Props { searchSong: (e: any) => void }
const SearchBox = (Props: Props) => {
    return (
        <input
            className="form-control text-box"
            type="text"
            placeholder="looking for a song?"
            onChange={Props.searchSong} />
    )
}

export default SearchBox