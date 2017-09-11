import React, { Component } from 'react';
import SongList from './components/SongList'
import SongForm from './components/SongForm'
import axios from 'axios'

class App extends Component {
  state = {top100: [], available: []}

  componentDidMount() {
    let available = []
    let top100 = []

    axios.get('/api/songs')
      .then( res => {
        res.data.forEach( song => {
          if (song.rank === 0){
            available.push(song)
          }
          else
            top100.push(song)
        })
      this.setState({top100, available})
      })
  }
    
  updateSong = (id, title, rank) => {
    axios.put(`/api/songs/${id}`, {
      title: title
    }).then( res => {
        const available = this.state.available.map( t => {
          if (t.id === id)
            return res.data
          return t
        });
        this.setState({ available });
      })
  }

  deleteSong = (id) => {
    axios.delete(`/api/songs/${id}`)
      .then( () => {
        const { available } = this.state;
        this.setState({ available: available.filter( t => t.id !== id ) })
      })
  }

  addSong = (title) => {
    let song = { title }
    axios.post('/api/songs', song)
      .then( res => {
        const { available } = this.state;
        this.setState({ available: [...available, res.data] })
      })
  }

  addSongToList = (id) => {
    axios.patch(`/api/add_song_to_list/${id}`)
      .then( res => {
        const { available } = this.state
        const { top100 } = this.state
        this.setState({ top100: [...top100, res.data], available: available.filter( t => t.id !== id ) })
      })
  }

  removeSongFromList = (id) => {
    axios.patch(`/api/remove_song_from_list/${id}`)
      .then( res => {
        const { available } = this.state
        debugger
        this.setState({ available: [...available, res.data.song1], top100: res.data.top100})
      })
  }

  downSong = (id) => {
    axios.patch(`/api/downrank_song/${id}`)
    .then( res => {
      this.setState({top100: res.data})
      })
  }

  uprankSong = (id) => {
    axios.patch(`/api/uprank_song/${id}`)
    .then( res => {
      this.setState({top100: res.data})
      })
  }

  
  
  render() {
    return (
      <div className="ui container">
        <div className="ui centered grid">
        <div className="row">
          <div className="ui header eight wide column">
            <h1>Welcome To The Top 100</h1>
            <SongForm title={null} id={null} addSong={this.addSong} />
          </div>
        </div>
          <div className="six wide column">
            <h2>Top 100</h2>
            <SongList
              songs={this.state.top100}
              updateSong={this.updateSong}
              deleteSong={this.deleteSong} 
              addSong={this.addSong}
              addSongToList={this.addSongToList}
              removeSongFromList={this.removeSongFromList}
              downrankSong={this.downSong}
              uprankSong={this.uprankSong}
            /> 
          </div>
          <div className="six wide column">
            <h2>Available Song</h2>
            <SongList
              songs={this.state.available}
              updateSong={this.updateSong}
              deleteSong={this.deleteSong} 
              addSong={this.addSong}
              addSongToList={this.addSongToList}
              removeSongFromList={this.removeSongFromList}
              downrankSong={this.downSong}
              uprankSong={this.uprankSong}
            /> 
          </div>
        </div>
      </div>
    )
  }
}

export default App;
