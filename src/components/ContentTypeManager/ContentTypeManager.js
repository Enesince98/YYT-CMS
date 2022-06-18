import React from 'react'
import Table from '../Table/Table'
import Search from '../Search/Search'
const ContentTypeManager = () => {
  return (
    <div>
      {/* <Table url = 'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes' isParent = {true} whoseParent = "contents"/> */}
      {/* <Table url = 'https://localhost:44325/api/ContentTypes' isParent = {true} whoseParent = "contents"/> */}
      <Table url = 'https://localhost:44325/api/ContentTypes' isParent = {false}/>
      </div>
  )
}

export default ContentTypeManager