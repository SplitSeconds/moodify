// import React, { Component } from "react";
// import api from "../../api";
// import SpotifyPlayer from "react-spotify-player";

// class GeneratedPlaylist extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playlists: []
//     };
//   }
//   componentDidMount() {
//     api.getPlaylists().then(playlists => {
//       this.setState({
//         playlists
//       });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           {console.log("here is the first playlist" + this.state.playlists)}
//         </div>
//         {this.state.playlists.map((p, index) => (
//           <div className="user-playlists-wrapper" key={index}>
//             <SpotifyPlayer uri={p.uri} size="large" view="list" theme="black" />
//             <div />
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default GeneratedPlaylist;
