import { Container } from 'react-bootstrap'

import HeaderImage from './components/HeaderImage'
import HeaderBrand from './components/HeaderBrand'
import TodoContainer from './components/TodoContainer'

function App() {
  return (
    <>
      <div className="position-relative">
        <HeaderImage />

        <div className="position-absolute top">
          <Container fluid="lg">

            <HeaderBrand />
            <TodoContainer />

          </Container>
        </div>
      </div>
    </>
  )
}

export default App