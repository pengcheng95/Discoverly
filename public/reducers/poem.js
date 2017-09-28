const poem = (state = {
  title: 'Testing Poem',
  author: '',
  lines: [],
  vote: null,
  poemId: -1,
  bookmarked: false
}, action) => {
  switch (action.type) {
    case 'CHANGE_POEM':
      console.log(action);
      return {
        title: action.obj.title,
        author: action.obj.author,
        lines: action.obj.lines,
        vote: null,
        poemId: -1,
        bookmarked: false
      }
    default:
      return state
  }
}

export default poem;