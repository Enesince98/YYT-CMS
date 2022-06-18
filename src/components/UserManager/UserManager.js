import React from 'react'
import Table from '../Table/Table'
const UserManager = () => {
  return (
    <div>
    {/* Must add REST API instead of mockApi */}
    <Table isParent = {false} url = 'https://62a492ef47e6e40063951ec5.mockapi.io/api/users'/></div>
  )
}

export default UserManager