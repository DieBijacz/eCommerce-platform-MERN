import React, {useState} from 'react'
import {Form, Button, FormControl} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    
    if(keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <FormControl type='text' name='search' onChange={(e) => setKeyword(e.target.value)} placeholder='Search...' className='mr-sm-2 ml-sm-5'></FormControl>
      <Button type='submit' variant='outline-success' className='p-2'><i className="fa-solid fa-magnifying-glass"></i></Button>
    </Form>
  )
}

export default SearchBar