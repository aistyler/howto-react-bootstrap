import React from 'react';
import './App.css';
import { Button, Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
//import { useTheme } from './themes/ThemeContextUsingLazy';
import { useTheme } from './themes/ThemeContext';

function App() {
  const { theme, setTheme } = useTheme();
  //console.log('>>> getComputedStyle(document.documentElement).getPropertyValue(''))

  function onClickLightTheme() {
    setTheme('light');
  }
  function onClickDarkTheme() {
    setTheme('dark');
  }
  function onClickDefaultTheme() {
    setTheme('system');
  }

  return (
    <div className="App">
      <Container fluid={true}>
        <Row>
          <Col sm="3">
            <p>current theme: {theme}</p>
          </Col>
          <Col>
            <Button onClick={onClickLightTheme}>Light</Button>
            <Button onClick={onClickDarkTheme}>Dark</Button>
            <Button onClick={onClickDefaultTheme}>Default</Button>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <p>Cards</p>
          </Col>
          <Col>
            <div className="card" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <p>List Group</p>
          </Col>
          <Col>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Content for list item
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Content for list item
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Content for list item
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
              </li>
            </ol>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <p>Navbar</p>
          </Col>
          <Col>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    <a className="nav-link" href="#">Features</a>
                    <a className="nav-link" href="#">Pricing</a>
                    <a className="nav-link disabled">Disabled</a>
                  </div>
                </div>
              </div>
            </nav>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <p></p>
          </Col>
          <Col>
          </Col>
        </Row>

      </Container>


    </div>
  );
}

export default App;
