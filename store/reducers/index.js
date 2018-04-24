const reducer = (state = {tick: 'init', tack: 'init'}, action) => {
  switch (action.type) {
    case 'TICKK':
    case 'TICK':
      return Object.assign({}, state, {tick: action.payload});
    case 'TACK':
      return Object.assign({}, { tack: action.payload});
    default:
      return state
  }
};

export default reducer;