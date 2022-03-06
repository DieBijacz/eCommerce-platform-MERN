import React, {useState} from 'react'
import {Form, Button, FormControl} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({params}) => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(keyword.trim()) {
      navigate(`${params}/search/${keyword}`)
    } else {
      navigate(`${params}/`)
    }
  }

  const clear = () => {
    setKeyword('')
    navigate(`${params}/`)
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex my-3 justify-content-center'>
      <FormControl value={keyword} style={{maxWidth: '400px'}} type='text' name='search' onChange={(e) => setKeyword(e.target.value)} placeholder='Search...' className='mr-sm-2 ml-sm-5'></FormControl>
      <Button type='submit' variant='outline-dark' className='p-2'><i className="fa-solid fa-magnifying-glass"></i></Button>
      <Button variant='light' onClick={clear}>Clear</Button>
    </Form>
  )
}

SearchBar.defaultProps = {
  params: '',
}

export default SearchBar