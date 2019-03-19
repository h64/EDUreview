import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate/PageTemplate';
import ReviewsListEntry from '../../components/ReviewsListEntry/ReviewsListEntry';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';

class ProgramDetailsPage extends React.Component {
    state = {
        name: '',
        institutionName: '',
        institutionId: '',
        types: [],
        locations: [],
        reviews: []
    };

    componentDidMount() {
        let institutionName, institutionId;
        try {
            institutionName = this.props.location.state.institutionName;
            institutionId = this.props.location.state.institutionId;
        } catch { }

        fetch(`/api/programs/${this.props.match.params.id}`)
            .then(response => response.json()) // fetch program from API
            .then(data => {
                const { name, types, reviews, locations } = data;
                this.setState({
                    name,
                    types,
                    locations,
                    reviews
                });
                return data;
            })
            .then(data => {
                // Acquire username for each review from API
                return data.reviews.map(review => this.fetchUsername(review._id));
            })
            .then(promises => {
                return Promise.all(promises);
            })
            .then(reviews => {
                this.setState({
                    reviews,
                    institutionName,
                    institutionId
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchUsername = id => {
        return new Promise((resolve, reject) => {
            fetch(`/api/reviews/${id}`)
                .then(res => res.json())
                .then(review => {
                    resolve(review);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    render() {
        const { name, institutionName, types, locations, institutionId } = this.state;
        return (
            <PageTemplate>
                <BreadCrumb>
                    <Link to="/">Home</Link>
                    Search
                    <Link to={`/institutions/${institutionId}`}>{institutionName}</Link>
                    {this.state.name}
                </BreadCrumb>
                <h1>{name}</h1>
                {institutionName ?
                    <h2>At &nbsp;
                        <Link to={`/institutions/${institutionId}`}>
                            {institutionName}
                        </Link>
                    </h2>
                    :
                    <></>
                }
                <h3>Type(s): {types.map((type, key) => {
                    if (key === types.length - 1) {
                        return <span key={key}>{type} </span>
                    } else {
                        return <span key={key}>{type}, </span>
                    }
                })}</h3>
                <h3>Location(s): {locations}</h3>

                <br />
                <Link to={{
                    pathname: `/programs/${this.props.match.params.id}/addreview`,
                    state: {
                        institutionName,
                    }
                }}>
                    Add a review for this program
                </Link>
                <h2>Reviews: </h2>
                {this.state.reviews.map((review, idx) => (
                    <ReviewsListEntry key={idx} user={review.user} review={review.review} />
                ))}
            </PageTemplate>
        );
    }
}

export default ProgramDetailsPage;
