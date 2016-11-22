const React = require('react')
const ReactDOM = require('react-dom')

class Archive extends React.Component {
  render () {
    return (
      <div className='archive'>
        <h1> Archive </h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Archive />,
  document.getElementById('app')
)
