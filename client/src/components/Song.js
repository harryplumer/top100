import React from 'react'

class Song extends React.Component{ 
  state = {editing: false, title: this.props.title}

  handleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateSong(this.props.id, this.state.title, this.props.rank)
    this.setState({editing: false})
  }

  songFrame= () => {
    if (!this.state.editing){
      return this.songBody()
    } else {
      return(<li>
        <form onSubmit={this.handleSubmit}>
        <input
          required
          value={this.state.title}
          onChange={this.handleChange}
          />
      </form>
      </li>
      )
    }
  }

  songBody = () => {
    if (this.props.rank === 0){
      return(
        <div className="item">
          <div className="content">
            <span className="header">{this.props.title}</span>
            <div className="extra">
              <div className="ui three buttons">
                <button className="ui basic button green" onClick={() => this.props.addSongToList(this.props.id)}>Add To Top 100</button>
                <button className="ui basic button yellow" onClick={() => this.setState({editing: true})}>Edit</button>
                <button className="ui basic button red" onClick={() => this.props.deleteSong(this.props.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className="item">
          <div className="content">
            <span className="header">{this.props.rank}. {this.props.title}</span>
            <div className="extra">
              <div className="ui three buttons">
                <button className="ui basic button green" onClick={() => this.props.uprankSong(this.props.id)}>Uprank Song</button>
                <button className="ui basic button yellow" onClick={() => this.props.downrankSong(this.props.id)}>Downrank Song</button>
                <button className="ui basic button red" onClick={() => this.props.removeSongFromList(this.props.id)}>Remove From Top 100</button>
              </div>
            </div>
          </div>
        </div>
        ) 
    }
  }



  render(){
    return this.songFrame() 
  }
}


export default Song