const user = (state = {
  userId: '',
  username: 'Test',
  bookmarked: []
}, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        userId: action.obj.id,
        username: action.obj.username,
        bookmarked: action.obj.bookmarked
      }
    default:
      return state
  }
}

export default user;