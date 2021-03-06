const authenticate = (state, options) => {
  if (!options) {
    state.auth = false
    return
  }

  switch (options.type) {
    case 'simple':
      if (!options.username || !options.password) {
        throw new Error(
          'Simple authentication requires both a username and password to be set'
        )
      }
      break
    case 'token':
      if (!options.token || !options.appkey) {
        throw new Error(
          'Token authentication requires a token and appkey to be set'
        )
      }
      break
    default:
      throw new Error(
        "Invalid authentication type, must be 'simple' or 'token'"
      )
  }

  state.auth = options
}

module.exports = authenticate
