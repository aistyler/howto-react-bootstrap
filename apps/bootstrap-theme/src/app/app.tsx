import { Container, Row, Col,ToggleButton, ButtonGroup, Navbar } from 'react-bootstrap';
import { useTheme } from '@howto/bs-theme';
import { Examples } from './examples';

export function App() {
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
        <Navbar sticky="top">
          <Container>
              <ButtonGroup>
                <ToggleButton type='radio' value='light' checked={theme === 'light'} onClick={onClickLightTheme} variant="outline-success">Light</ToggleButton>
                <ToggleButton type='radio' value='dark' checked={theme === 'dark'} onClick={onClickDarkTheme} variant="outline-success">Dark</ToggleButton>
                <ToggleButton type='radio' value='system' checked={theme === 'system'} onClick={onClickDefaultTheme} variant="outline-success">Default</ToggleButton>
              </ButtonGroup>
          </Container>
        </Navbar>
        <Row>
          <Col>
            <h3>Current theme: {theme}</h3>
          </Col>
        </Row>
        {
          Examples.map((e, idx) => (
            <Row key={e.dispalyName} className='pt-3'>
              <Col sm="2">
                <a 
                  className="btn btn-primary" 
                  data-bs-toggle="collapse" 
                  href={`#example_${idx}`} 
                  role="button" 
                  aria-expanded={true} 
                  >
                <p>{e.dispalyName}</p>
                </a>
              </Col>
              <Col id={`example_${idx}`} className="collpase">
                {e.content}
              </Col>
            </Row>
          ))
        }
      </Container>
    </div>
  );
}

export default App;
