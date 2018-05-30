import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Song } from './SongContainer'

interface Props {
    songs: Song[],
    nextPage: (e: any) => void,
    songsPerPage: number
}

const Pagination = (Props: Props) => {
    const pageNumber = [];
    const songsPerPage = Props.songsPerPage
    for (let i = 1; i <= Math.ceil(Props.songs.length / songsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <Row>
            <Col className="pagination-number">
                {
                    pageNumber.map(number => {
                        return (
                            <span
                                key={number}
                                id={number.toString()}
                                onClick={Props.nextPage}
                            >
                                {number}
                            </span>
                        )
                    })
                }
            </Col>
        </Row>
    )
}

export default Pagination