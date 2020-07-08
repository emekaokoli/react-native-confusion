import React, { Component } from 'react'
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
    }
  }

  render() {
    return <Menu dishes={this.state.dishes} />
  }
}