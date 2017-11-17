FIREBASE
/users
  /uid
    displayName
    photoURL
    uid
/scores    --- Denormalize the data, that way scores has minimum info we need for the scores view
  /uid
    score
    displayName
    photoURL
    uid

/settings
  /uid
    restDuration
    timerDuration

REDUX
.users
  [uid]: {
    displayName
    photoURL
    uid
  }
.scores   --- Normalize redux
  isFetching
  listenerSet --- so we can have realtime leaderboard
  leaderboardUids
  userScores: {
    [uid]: score
  }
