import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Header, Image } from 'semantic-ui-react';
import logo from './cryptocurrent.png'

const Nav = props => {

  if (props.loggedIn) {
    return (

      <Menu borderless secondary>
        <Menu.Item >
          <Image src={logo} size='medium'></Image>
        </Menu.Item>

        <Menu.Item><Header>Welcome, {props.user.firstName}!</Header></Menu.Item>

        <Menu.Item as={NavLink} to="#" name="logout" onClick={props.logout}>
          Logout
        </Menu.Item>
      </Menu>

    )
  } else {
    return (

      <Menu borderless secondary>
        <Menu.Item >
          <Image src={logo} size='medium'></Image>
        </Menu.Item>

        <Menu.Item as='a' href="/auth/google" >
          Sign in with Google
        </Menu.Item>
      </Menu>

    )
  }
}

export default Nav
