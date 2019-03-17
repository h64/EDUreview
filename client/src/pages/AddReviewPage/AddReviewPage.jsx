import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import withAuth from '../../components/withAuth/withAuth';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class AddReviewPage extends Component {
    state = {
        redirect: false,
        validated: false,
        errors: {}
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        let payload = {
            // review: this.state.textValue,
            programId: this.props.match.params.id
        };
        if (this.props.user) {
            payload.user = this.props.user._id;
        }
        fetch('/api/reviews/', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
        // Did we <Link> to this page? ie. the program data is passed via props.location
        if (!this.props.location.program) {
            fetch(`/api/programs/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(review => {
                    this.setState(review)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            this.setState({ redirect: true })
            // ToDo - Redirect to browse page?
        }
    }

    render() {
        if (this.state.redirect) return <Redirect to={`/programs/${this.props.match.params.id}`} />;

        const { validated } = this.state;
        const { errors } = this.state.errors;


        return (
            <PageTemplate>
                <h1>Write your review for {this.state.name}</h1>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={this.handleSubmit}
                >
                    <Form.Group controlId="formGroupLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            placeholder="Enter Location"
                            value={this.state.location}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="formGroupRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            type="text"
                            name="rating"
                            placeholder="Enter Rating"
                            value={this.state.rating}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupEnrollment">
                        <Form.Label>Enrollment</Form.Label>
                        <Form.Control
                            type="text"
                            name="enrollment"
                            placeholder="Enter Enrollment Status"
                            value={this.state.enrollment}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="formGroupTF1">
                        <Form.Label>Did you enroll in the program in the hopes of starting a new career, or a career transition?</Form.Label>
                        <Form.Control
                            type="text"
                            name="trueFalseQuestion1"
                            placeholder="Enter Response"
                            value={this.state.trueFalseQuestion1}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupTF2">
                        <Form.Label>Did the course match your expectations?</Form.Label>
                        <Form.Control
                            type="text"
                            name="trueFalseQuestion2"
                            placeholder="Enter Response"
                            value={this.state.trueFalseQuestion2}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupTF3">
                        <Form.Label>Would you recommend this program to somebody with similar expectations as you?</Form.Label>
                        <Form.Control
                            type="text"
                            name="trueFalseQuestion3"
                            placeholder="Enter Response"
                            value={this.state.trueFalseQuestion3}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="formGroupHeadline">
                        <Form.Label>Review Headline</Form.Label>
                        <Form.Control
                            type="text"
                            name="headline"
                            placeholder="Enter Review Headline"
                            value={this.state.headline}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupQ1">
                        <Form.Label>What are the most important takeaways from your time in the program?</Form.Label>
                        <Form.Control
                            type="text"
                            name="q1"
                            placeholder="Enter Response"
                            value={this.state.q1}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupQ2">
                        <Form.Label>What things detracted from, or were missing from the program</Form.Label>
                        <Form.Control
                            type="text"
                            name="q2"
                            placeholder="Enter Response"
                            value={this.state.q2}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupQ3">
                        <Form.Label>Advice to future students:</Form.Label>
                        <Form.Control
                            type="text"
                            name="q3"
                            placeholder="Enter Response"
                            value={this.state.q3}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Required Field
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Button type="submit">Submit</Button>
                </Form>
            </PageTemplate>
        );
    }
}

export default withAuth(AddReviewPage);
