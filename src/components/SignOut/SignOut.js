import { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Import the signOut api axious call
import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // when our component is first shown on the page
  componentDidMount () {
    // destructure our props
    // history comes from withRouter, the rest come from App.js
    const { msgAlert, history, clearUser, user } = this.props

    // make a sign out axios request (pass it the user for the token)
    signOut(user)
      // whether our sign out was successful or failed on the server's side
      // tell the client it was successful
      // Note: A little strange, that we tell the user it signed out successfully,
      //       but it's because we will sign out successfully (client side anyway)
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      // whether it succeeds or fails -> send us to the home page
      .finally(() => history.push('/'))
      // whether it succeeds or fails -> clear the user (reset the user to `null`)
      .finally(() => clearUser())
  }

  render () {
    // We don't ever want to see a SignOut component
    // If someone tries to sign out, we want to sign them out, and send them to
    // to the home page.
    //
    // To render nothing on the page, return a falsey value (like an '')
    return ''
  }
}

export default withRouter(SignOut)
