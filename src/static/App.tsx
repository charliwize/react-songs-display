import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import SongContainer from './components/SongContainer'
import './assets/css/styles.css';


export default class App extends React.Component {
    render() {
        return (
            <SongContainer />
        )   
    }
}