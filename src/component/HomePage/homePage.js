// All the view component are integrated Headers.

import React, { Component } from 'react';
import { Row, Container } from "react-bootstrap";

// Custom component Import
import { HeaderComponent, FooterComponent } from '../component';
import BookingPage from '../BookingPage/bookingPage';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //
        }
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <HeaderComponent />
                    <BookingPage />
                    <FooterComponent />
                </Row>
            </Container>
        )
    }
}

export default HomePage;