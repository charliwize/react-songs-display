import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import CircularProgressbar from 'react-circular-progressbar';
import { Song } from './SongContainer'

interface Props {
    song: Song
    changeRating: (song: Song, e: any) => void
    key: number
}
const SongRow = (Props: Props) => {
    return (
        <Row className="song-row">
            <Col md={3}>
                <div className="img-wrapper">
                    <img src={require('../assets/images/fingerprint.png')} className="img"/>
                </div>
            </Col>
            <Col md={2}>
                <CircularProgressbar 
                    percentage={Props.song.level} 
                    textForPercentage={(text) => `${text}`}
                    initialAnimation={true}
                    className="level-bar"
                />
            </Col>
            <Col md={7}>
                <Row><Col><span className="title">{Props.song.title}</span></Col></Row>
                <Row>
                    <Col md={3} className="no-pad-marg">
                        <StarRatings
                            rating={Number(Props.song.rating)}
                            starRatedColor="rgb(245, 245, 245)"
                            changeRating={(evt: any) => Props.changeRating(Props.song, evt)}
                            numberOfStars={5}
                            starDimension="27px"
                            starSpacing="1px"
                            starHoverColor="rgb(245, 245, 245)"
                            starEmptyColor="rgba(255, 255, 255, 0.21)"
                        />
                    </Col>
                    <Col md={4} className="no-pad-marg"><span className="artist">{Props.song.artist}</span></Col>
                    <Col md={4} className="no-pad-marg"><span className="glyphicon glyphicon-option-horizontal pull-right gi-2x" aria-hidden="true"></span></Col>

                </Row>
            </Col>
        </Row>
       
    )
}

export default SongRow