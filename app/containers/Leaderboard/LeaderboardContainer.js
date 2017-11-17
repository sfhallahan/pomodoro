import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView } from 'react-native'
import { Leaderboard, Leader } from '../../components'
import { connect } from 'react-redux'
import { fetchAndSetScoresListener } from '../../redux/modules/scores'

class LeaderboardContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.leaders)
    }
  }

  componentDidMount() {
    if(this.props.listenerSet === false) {
      this.props.dispatch(fetchAndSetScoresListener())
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.leaders !== this.props.leaders) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.leaders)
      })
    }
  }

  renderRow = ({displayName, photoURL, score}) => {
    return <Leader name={displayName} avatar={photoURL} score={score} />
  }

  render () {
    return (
      <Leaderboard
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        openDrawer={this.props.openDrawer}
        listenerSet={this.props.listenerSet} />
    )
  }
}

function mapStateToProps({scores, users}) {
  return {
    listenerSet: scores.listenerSet,
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        score: scores.usersScores[uid],
        ...users[uid],
      }
    })
  }
}


export default connect(mapStateToProps)(LeaderboardContainer)
