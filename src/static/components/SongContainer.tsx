import * as React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import SongRow from './Row'
import SearchBox from './Search'
import Pagination from './Pagination'
import LevelSelect from "./LevelSelect";

export interface Song {
    "artist": string,
    "title": string,
    "difficulty": number,
    "level": number,
    "released": string,
    "rating": string,
    "_id": string
}
interface Props { }
interface State {
    error: string,
    songs: Song[],
    letter: string,
    currentPage: number,
    songsPerPage: number,
    filteredSongs: Song[],
    searchLetter: string,
    levels: string[],
    averageDifficulty: number | undefined
}
export default class SongContainer extends React.PureComponent<Props, State>  {
    constructor(props: Props) {
        super(props);

        this.state = {
            error: "",
            songs: [],
            letter: "",
            currentPage: 1,
            songsPerPage: 5,
            filteredSongs: [],
            searchLetter: "",
            averageDifficulty: undefined,
            levels: [],

        }
    }
    async componentDidMount() {
        let songs
        try {
            songs = await fetch('/get', {
                credentials: 'same-origin',
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })

            songs = await songs.json()
        } catch (error) { return }


        if (songs.length) {
            const levels = Array.from(new Set([...songs].map(song => song.level)))
            this.setState({ songs, levels })
        }
    }

    nextPage = (event: any) => {
        this.setState({ currentPage: Number(event.target.id) })
    }
    changeRating = async (song: Song, e: any) => {
        let request
        try {
            request = await fetch('/songs/search?_id=' + song._id + '&rating=' + e, {
                credentials: 'same-origin',
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
        } catch (error) {
            console.log(error)
        }

    }

    searchSong = (e: any) => {
        const searchLetter = e.target.value.toLowerCase()
        let filteredSongs = [...this.state.songs]
        filteredSongs = filteredSongs.filter(function (item) {
            return item.title.toLowerCase().indexOf(searchLetter.toLowerCase()) !== -1
                || item.artist.toLowerCase().indexOf(searchLetter.toLowerCase()) !== -1
        });

        this.setState({ searchLetter, filteredSongs });
    }

    setLevel = async (e: any) => {
        let averageDifficulty
        try {
            averageDifficulty = await fetch('/songs/avg/difficulty?level=' + e.target.value, {
                credentials: 'same-origin',
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            averageDifficulty = await averageDifficulty.json()
            this.setState({ averageDifficulty })
        } catch (error) { console.log(" +error") }
    }

    render() {
        console.log(this.state.averageDifficulty)
        const { songs, currentPage, filteredSongs, searchLetter } = this.state
        const lastSongIndexInPage = currentPage * this.state.songsPerPage
        const firstSongIndex = lastSongIndexInPage - this.state.songsPerPage
        let currentSongs = filteredSongs.length ? filteredSongs.slice(firstSongIndex, lastSongIndexInPage)
            : searchLetter.length && !filteredSongs.length ? []
                : songs.slice(firstSongIndex, lastSongIndexInPage)

        return (
            this.state.songs.length ? (
                <div className="wrapper">
                    <LevelSelect
                        levels={this.state.levels}
                        setLevel={this.setLevel}
                    />
                    <SearchBox searchSong={this.searchSong} />
                    <Row className="songs_list">
                        {
                            currentSongs.map((song: Song, i: number) => {
                                return (
                                    <SongRow
                                        song={song}
                                        changeRating={this.changeRating}
                                        key={i}
                                    />
                                )
                            })
                        }
                    </Row>
                    <Pagination
                        songs={filteredSongs.length ? filteredSongs :
                            searchLetter.length && !filteredSongs.length ? [] :
                                this.state.songs}
                        nextPage={this.nextPage}
                        songsPerPage={this.state.songsPerPage}
                    />
                </div>
            ) : null
        )
    }
}