// import React from 'react'
// import Lottie from 'react-lottie';
// import bodymovin from 'bodymovin';
// import * as animationData from '../../Moodify_Logo.json'
 
// export default class Animation extends React.Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {isStopped: false, isPaused: false};
//   }

//   render() {
//     const animation = bodymovin.loadAnimation({
//       container: document.getElementById('lottie'), // Required
//       path: animationData, // Required
//       renderer: 'svg', // Required
//       loop: true, // Optional
//       autoplay: true, // Optional
//       name: "Moodify logo", // Name for future reference. Optional.
//     })

//     return (
//       <div>
//         <Lottie options={animation}
//                 height={400}
//                 width={400}
//                 isStopped={this.state.isStopped}
//                 isPaused={this.state.isPaused}/>
//     </div>
//     )}
// }