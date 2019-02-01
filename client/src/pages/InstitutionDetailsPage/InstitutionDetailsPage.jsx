import React from 'react';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';

class InstitutionDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            website: '',
            programs: []
        }
    }

    componentDidMount() {
        fetch(`/api/institutions/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState(data);
        })
    }

    render() {
        return (
            <PageTemplate>
                <h1>This the institution details for:</h1>
                <h2>{ this.state.name }</h2>
                <p>{ this.state.website }</p>

                {/* All reviews down here */}
                {this.state.programs.map( (program, idx) => {
                    return (
                        <div key={idx}>
                            <p>{program.name}</p>
                            { program.locations.map( (location, idx) => <p key={idx}>{location}</p>) }
                            { program.types.map( (type, idx) => <p key={idx}>{type}</p>) }
                        </div>
                    )
                })}
            </PageTemplate>
        )
    }
}

export default InstitutionDetailsPage;