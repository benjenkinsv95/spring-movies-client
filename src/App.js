import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// this imports the fourth version of the universally unique id package
// "v4 as uuid" means that in App.js, we'll refer to `v4` as uuid
// This is the same as:
// const uuid = require('uuid').v4
import { v4 as uuid } from 'uuid'

// Import all of our components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import WithRouterHooksTest from './components/WithRouterHooksTest/WithRouterHooksTest'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the signed in user we get back from the API
      // the user state initally be null (since we aren't signed in)
      user: null,
      // these are the messages we want to show our user. Initially, we don't
      // have any messages
      msgAlerts: []
    }
  }

  // this function, accepts a user, and then sets the user's state to that
  // parameter. (used in signIn/signUp)
  setUser = user => this.setState({ user })

  // clearUser, will reset the user state back to it's inital value of null
  // (used in signOut)
  clearUser = () => this.setState({ user: null })

  // accepts an id, so we know which msgAlert to delete
  deleteAlert = (id) => {
    // set the `msgAlerts` state
    // to what the msgAlerts used to be (state.msgAlerts)
    // but filter for the messages, which don't have the id, we are trying to delete
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // heading - title of the alert
  // message - body of alert
  // variant - bootstrap variant (color) to use (success, danger, primary, secondary)
  msgAlert = ({ heading, message, variant }) => {
    // create a unique id for this message alert
    // 1. used for the `key` attribute in a loop
    // 2. used in `deleteAlert`, so we know which message to delete
    const id = uuid()

    // set the `msgAlerts` state.
    // To be the existing `msgAlerts` (...state.msgAlerts)
    // and a new `msgAlert` ({ heading, message, variant, id })

    // we have to use setState and a new array when updating `msgAlerts`
    // because the first rule of using state correctly, is to never modify state
    // directly. Which adding an element to the end with `push` would do.
    // https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructure our state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        {/* Add the top navbar to the screen.
            pass the user prop (to show the signed in/out urls)
            also for our user's email */ }
        <Header user={user} />

        {/* Map each msgAlert into an AutoDismissAlert component */}
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            // the key atttribute will be the msgAlert's unique id
            key={msgAlert.id}

            // pass down these props to show the alert
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}

            // pass down these props, to eventually remove the alert
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}

        {/* Notice how we can use a regular bootstrap class. To center our content */}
        <main className="container">

          {/* Similar routes to the react-router lesson.
              We have to use `render props` instead of `component` prop
              to pass down the `msgAlert` and `setUser` props */}
          <Route path='/sign-up' render={() => (
            // We pass the SignUp component msgAlert to show success/failure messages
            // and setUser to keep track of the user (for their token & email)
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* Same as sign up, but using SignIn component and /sign-in path */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          {/* An AuthenticatedRoute is like a Route, but it redirects you to the
              home page if you aren't signed it.
              You *must* pass it a `user` (so it knows if you're signed in)

              There are multiple ways to sign out. This way allows us to sign Out
              by going to a specific path. */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            // pass down the clearUser prop, so that we can set `user` to `null` after
            // signing out
            // since signOut needs to make authenticated requests, pass down
            // the `user` as a prop
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            // since ChangePassword needs to make authenticated requests, pass down
            // the `user` as a prop
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route path='/with-router-hooks-test/:id' render={() => (
            <WithRouterHooksTest/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
