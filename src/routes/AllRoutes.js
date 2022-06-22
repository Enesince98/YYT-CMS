import React from 'react'

function AllRoutes() {
  return (
    <div>
        <Routes>
        
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="table" element={<Table />} />
            <Route
              path="content-type-builder"
              element={<ContentTypeBuilder />}
            />
            <Route
              path="content-type-manager/*"
              element={<ContentTypeManager />}
            />
            <Route path="contents/*" element={<Contents />} />
            <Route path="user-manager" element={<UserManager />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AllRoutes