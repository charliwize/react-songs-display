import * as React from 'react';
import { Button, Row, Col, FormControl, FormGroup } from 'react-bootstrap';

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
                className="text-box"
                onChange={Props.setLevel}
            >
                <option >--Filter by difficulty level--</option>

                {
                    Props.levels.map(level => {
                        return (
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