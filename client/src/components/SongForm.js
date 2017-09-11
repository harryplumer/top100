import React from 'react';

class SongForm extends React.Component {
  state = { title: '', editing: false }

  handleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addSong(this.state.title)
    this.setState({ title: ' ' })
  }

  render() {
    return (
      <div className="ui form">
        <form onSubmit={this.handleSubmit}>
          <div className="fields">
            <div className="fourteen wide field">
              <input
                placeholder="Add A Song"
                required
                value={this.state.title}
                onChange={this.handleChange}
                />
            </div>
            <div className="field">
              <input type="submit" value="Add" className="ui primary button" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default SongForm;