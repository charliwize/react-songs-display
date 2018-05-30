import * as React from 'react';
import { Button, Row, Col, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

interface Props {
    levels: string[],
    setLevel: (e: any) => void
}
const LevelSelect = (Props: Props) => {
    return (
        <FormGroup>
            <FormControl
                componentClass="select"
                defaultValue=""
                onChange={Props.setLevel}
            >
            <option value="--Filter by difficulty level--"/>
            
                {
                    Props.levels.map(level => {
                    return(
                        <option value={level} key={level}>
                            {level}
                        </option>
                    )
                })
            }
            </FormControl>
        </FormGroup>
    )
}

export default LevelSelect