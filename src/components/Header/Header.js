import React, { Fragment } from 'react'
// Import the Bootstrap Nav/Navbar components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// These are the links we want to show when we are signed in
const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// These are the links we want to show when are we signed out
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// We will always show these links
const alwaysOptions = (
  <Fragment>
    {/* Always include a link to the home page.
        Note these links are bootstrap links and have a different format
        than react-router links */}
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  // bg - is the background color variant
  // variant - by default links are black, variant=dark sets links to be white
  //           because our background is `dark`
  // expand= when crossing the `md` breakpoint, expand the hamburger menu into
  //         nav links
  <Navbar bg="primary" variant="dark" expand="md">
    {/* This is our navbar's title (brand).
        If it's clicked on go to the home page. */}
    <Navbar.Brand href="#">
      Spring Movies 🎥
    </Navbar.Brand>
    {/* The Navbar Toggle is the hamburger button that switches between
        showing our navigation links or not. */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* The Collapse section includes our navigation links. On smaller screens
        you can collapse it, by clicking on the `Toggle` component */}
    <Navbar.Collapse id="basic-navbar-nav">
      {/* A Nav component usually contains Nav.Links inside of it.
          ml-auto: stands for margin-left: auto;
          this automatically sets the available margin to the left, which pushes
          the links to the right hand side of the screen. */}
      <Nav className="ml-auto">
        {/* If we have a user, render a welcome message, otherwise show nothing.
            navbar-text gives the same styling as the white links.
            mr-2 adds margin to the right of the message, so it isn't crammed into the links.

            This uses short circuiting:
            if user is false, no value on the right hand side of `&&` will ever make
            the `&&` evaluate to true. So it gives up, returns the falsy value, and
            shows nothing.

            If the user is true, then we have to evaluate the right hand side, to
            see if it is `true` or `false`. Since Jsx is truthy, we evaluate to it.

            This
            user && <span>Welcome, {user.email}</span>
            Same as:
            user ? <span>Welcome, {user.email}</span> : ''
            */}
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* These are links we always want to show */}
        { alwaysOptions }
        {/* If we're signed in, show the signed in links (authenticatedOptions)
            otherwise, show the signed out links (unauthenticatedOptions) */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
