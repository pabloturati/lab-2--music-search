import React, { Component } from "react";

export default class Playlist extends Component {
  constructor() {
    super();
    this.getList();
    this.state = {
      playList: null
    };
  }

  getList() {
    fetch("https://react-api-lab.herokuapp.com/playlists/@sparragus")
      .then(r => r.json())
      .then(r => {
        const playlist = r.data;
        this.setState({ playlist });
      })
      .catch(e => console.log(e));
  }
  render() {
    const { playlist } = this.state;
    console.log(playlist);

    return (
      <div className="row">
        <div className="col-12">
          <div>
            <h1>My Playlist</h1>
            <ul>
              {playlist &&
                playlist.map(e => {
                  return (
                    <li key={e.id} className="mb-4">
                      <h4 className="mb-0">{e.track.name}</h4>
                      <p>
                        from {e.track.album.name} by {e.track.artist.name}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}