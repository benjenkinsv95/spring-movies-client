// A function component using `withRouter`
// import React from 'react'
// import { withRouter } from 'react-router-dom'
//
// const WithRouterHooksTest = ({ match, location, history }) => {
//   console.log('route props are', match, location, history)
//   return (
//     <div>
//       <p>match.params.id: {match.params.id}</p>
//       <p>location.pathname: {location.pathname}</p>
//       <p>history.action: {history.action}</p>
//     </div>
//   )
// }
//
// export default withRouter(WithRouterHooksTest)

// A function component using hooks to access route props
// NOTE: You have to bump the react-router-dom version to 5 in the package.json
// ex.   "react-router-dom": "^5.0.0",
import React from 'react'
import { useRouteMatch, useLocation, useHistory, useParams } from 'react-router-dom'

const WithRouterHooksTest = () => {
  const match = useRouteMatch()
  const location = useLocation()
  const history = useHistory()

  // to get the match's params
  const params = useParams()
  return (
    <div>
      <p>match.params.id: {match.params.id}</p>
      <p>params.id: {params.id}</p>
      <p>location.pathname: {location.pathname}</p>
      <p>history.action: {history.action}</p>
    </div>
  )
}

export default WithRouterHooksTest
