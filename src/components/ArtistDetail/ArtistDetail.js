import React, { Component } from "react";
import ArtistCard from "../ArtistCard";
import AlbumCard from "../AlbumCard";

export default class ArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.artistId = "";
    this.state = {
      loading: true,
      artistData: {}
    };
  }

  componentDidMount() {
    this.setArtistId();
    this.getArtistData();
  }

  setArtistId() {
    this.artistId = this.props.match.params.artistId;
  }

  getArtistData() {
    fetch(`https://react-api-lab.herokuapp.com/artists/${this.artistId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          artistData: data.data
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const artist = this.state.artistData;
    const { albums } = this.state.artistData;
    return (
      <div>
        <ArtistCard artistData={artist} />
        <div>
          {albums &&
            albums.map(album => {
              return <AlbumCard key={album.id} album={album} />;
            })}
        </div>
      </div>
    );
  }
}
