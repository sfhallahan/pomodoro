import { ref } from '../../config/constants'
import { fetchScore, increaseScore, decreaseScore } from '../../api/scores'
import { fetchUser } from '../../api/users'
import { addUser, addMultipleUsers } from './users'
import { showFlashNotification } from './flashNotification'

const FETCHING_SCORE = 'FETCHING_SCORE'
const FETCHING_SCORE_SUCCESS = 'FETCHING_SCORE_SUCCESS'
const FETCHING_SCORE_FAILURE = 'FETCHING_SCORE_FAILURE'
const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'
const ADD_SCORES = 'ADD_SCORES'
const ADD_LISTENER = 'ADD_LISTENER'
const INCREMENT_SCORE = 'INCREMENT_SCORE'
const DECREMENT_SCORE = 'DECREMENT_SCORE'

function fetchingScore() {
  return {
    type: FETCHING_SCORE,
  }
}

function fetchingScoreSuccess(uid, score) {
  return {
    type: FETCHING_SCORE_SUCCESS,
    uid,
    score,
  }
}

function fetchingScoreFailure(error) {
  console.warn(error)
  return {
    type: FETCHING_SCORE_FAILURE,
  }
}

function updateLeaderboard(uids) {
  return {
    type: UPDATE_LEADERBOARD,
    uids,
  }
}

function addScores(scores) {
  return {
    type: ADD_SCORES,
    scores,
  }
}

function addListener() {
  return {
    type: ADD_LISTENER,
  }
}

function incrementScore(uid, amount) {
  return {
    type: INCREMENT_SCORE,
    uid,
    amount,
  }
}

function decrementScore(uid, amount) {
  return {
    type: DECREMENT_SCORE,
    uid,
    amount,
  }
}

export function fetchAndHandleScore(uid) {
  return function (dispatch, getState) {
    dispatch(fetchingScore())
    return fetchScore(uid)
      .then((scoreInfo) => {
        dispatch(
          fetchingScoreSuccess(
            uid,
            !scoreInfo || !scoreInfo.score ? 0 : scoreInfo.score
          )
        )

        if(scoreInfo) { // The way we formatted firebase, we get the user info, might as well update users since we have it
          return dispatch(addUser(uid, {
            uid,
            displayName: scoreInfo.displayName,
            photoURL: scoreInfo.photoURL,
          }))
        } else {
          return fetchUser(uid)
            .then((user) => dispatch(addUser(uid, user)))
        }
      })
      .catch((error) => dispatch(fetchingScoreFailure(error)))

  }
}

export function fetchAndSetScoresListener() {
  return function (dispatch) {
    let listenerSet = false
    ref.child(`scores`)
       .on('value', (snapshot) => {
         const scores = snapshot.val() || {}
         const leaderboardUids = Object.keys(scores)
           .sort((a,b) => scores[b].score - scores[a].score)
           .filter((uid) => !!scores[uid].score || scores[uid].score > 0)
        const { justScores, users }  = leaderboardUids.reduce((prev, uid) => {
            prev.justScores[uid] = scores[uid].score
            prev.users[uid] = {
              displayName: scores[uid].displayName,
              photoURL:scores[uid].photoURL,
              uid: scores[uid].uid,
            }
            return prev
          }, {justScores: {}, users: {}})

          dispatch(updateLeaderboard(leaderboardUids))
          dispatch(addScores(justScores))
          dispatch(addMultipleUsers(users))

          if(listenerSet === false) {
            dispatch(addListener())
            listenerSet = true
          }
       })

  }
}

export function incrementAndHandleScore(amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(incrementScore(authedId, amount))
    increaseScore(authedId, amount)
      .catch((error) => {
        dispatch(decrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating score'}))
      })
  }
}

export function decrementAndHandleScore(amount) {
  return function (dispatch, getState) {
    const { authedId } = getState().authentication
    dispatch(decrementScore(authedId, amount))
    decreaseScore(authedId, amount)
      .catch((error) => {
        dispatch(incrementScore(authedId, amount))
        dispatch(showFlashNotification({text: 'Error updating score'}))
      })
  }
}


function usersScores(state={}, action) {
  switch (action.type) {
    case FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        [action.uid]: action.score,
      }
    case ADD_SCORES:
      return {
        ...state,
        ...action.scores,
      }
    case INCREMENT_SCORE:
      return {
        ...state,
        [action.uid]: state[action.uid] + action.amount,
      }
    case DECREMENT_SCORE:
      return {
        ...state,
        [action.uid]: state[action.uid] - action.amount,
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  listenerSet: false,
  leaderboardUids: [],
  usersScores: {},
  scoringIsActive: true,
}

export default function scores (state=initialState, action) {
  switch (action.type) {
    case FETCHING_SCORE:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        usersScores: usersScores(state.usersScores, action)
        }
    case FETCHING_SCORE_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboardUids: [...action.uids],
      }
    case ADD_SCORES:
    case INCREMENT_SCORE:
    case DECREMENT_SCORE:
      return {
        ...state,
        usersScores: usersScores(state.usersScores, action)
      }
    case ADD_LISTENER:
      return {
        ...state,
        listenerSet: true,
      }
    default:
      return state

  }
}
