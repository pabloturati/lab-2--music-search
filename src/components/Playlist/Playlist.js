import React, { Component } from "react";

export default class Playlist extends Component {
  constructor() {
    super();
    this.userName = "@pablo";
    this.getList();
    this.state = {
      loading: true,
      playList: null
    };
  }

  getList() {
    const url = `https://react-api-lab.herokuapp.com/playlists/${
      this.userName
    }`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          playlist: data.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { playlist } = this.state;

    return (
      <div className="row">
        <div className="col-12">
          <div>
            <h1>
              {this.userName && (
                <span>
                  {this.userName}
                  's
                </span>
              )}{" "}
              Playlist
            </h1>
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
