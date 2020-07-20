import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const styles = {
    containerStyle: {
        marginTop: '75px',
        backgroundColor: "black"
    },
    colStyle: {
        height: '8rem'
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',
        color: 'white'
    },
}

function Footer() {
    return (
        <Container fluid style={styles.containerStyle}>
            <Row>
                <Col style={styles.colStyle}>
                    <div style={styles.text}>
                        <span>&#169;</span> For hello Doc only
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;