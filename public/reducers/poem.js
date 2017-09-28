const poem = (state = {
  title: '',
  author: '',
  lines: [],
  vote: null,
  poemId: -1,
  bookmarked: false,
  comments: []
}, action) => {
  switch (action.type) {
    case 'CHANGE_POEM':
      console.log(action);
      return {
        title: action.obj.title,
        author: action.obj.author,
        lines: action.obj.lines,
        vote: null,
        poemId: action.obj.poemId,
        bookmarked: false,
        comments: action.obj.comments
      }
    default:
      return state
  }
}

export default poem;