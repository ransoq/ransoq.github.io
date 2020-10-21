import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import HomeButton from '../useHistory';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './app.css';

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        const NoMatch = ({ location }) => (
            <>
                <h3 className="not-found">NOT FOUND <code>{location.pathname}</code></h3>
                <HomeButton/>
                <ErrorMessage/>
            </>
          )

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>Toggle Random Char</button>
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' component={() => <h1 className="text-primary text-center">Welcome to GOT DB</h1>} exact/>
                            <Route path='/characters' component={CharacterPage}/>
                            <Route path='/houses' component={HousesPage}/>
                            <Route path='/books' exact component={BooksPage}/>
                            <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params;

                                return <BooksItem bookId={id} />
                            }
                            }/>
                            <Route exact component={NoMatch} />
                        </Switch>                        
                    </Container>
                </div>
            </Router>
        )
    }
}