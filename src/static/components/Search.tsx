import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

interface Props { searchSong: (e: any) => void }
const SearchBox = (Props: Props) => {
    return (
        <Row>
            <Col md={4} mdOffset={8}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="looking for a song ?"
                    onChange={Props.searchSong} />
            </Col>
        </Row>
    )
}

export default SearchBox