import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Row className='mt-5'>
        <Col className='text-center py-3 bg-primary' style={{height: '100px'}}>
          Copyright &copy; Masta Shop
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
