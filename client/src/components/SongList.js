import React from 'react';
import Song from './Song';

const SongList = ({songs, top100, updateSong, deleteSong, addSong, addSongToList, removeSongFromList, uprankSong, downrankSong}) => {
  return(<div className="ui divided items">
    { songs.map(song => 
      <Song 
        key={song.id}
        {...song}
        updateSong={updateSong}
        deleteSong={deleteSong}
        addSong={addSong}
        addSongToList={addSongToList}
        removeSongFromList={removeSongFromList}
        uprankSong={uprankSong}
        downrankSong={downrankSong}
      />
    )}
  </div> 
  )
} 
export default SongList;