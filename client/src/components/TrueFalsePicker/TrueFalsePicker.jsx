import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class TrueFalsePicker extends React.Component {
    state = {
        active: null
    }

    handleChange = (value, e) => {
        this.setState({
            active: e.target.value
        })
    }

    render() {
        return (
            <ButtonToolbar>
                <ToggleButtonGroup
                    type="radio"
                    name="options"
                    value={this.state.value}
                    className="mr-3"
                    onChange={this.handleChange}
                >
                    <ToggleButton variant="secondary" value={true}>Yes</ToggleButton>
                    <ToggleButton variant="secondary" value={false}>No</ToggleButton>
                </ToggleButtonGroup>
                <Button disabled variant="info">?</Button>
            </ButtonToolbar>
        )
    }
};

export default TrueFalsePicker;