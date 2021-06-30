
import React, { useState, useEffect, useRef } from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import BlockEditor from "./BlockEditor";
import CloudinaryMedia from "./CloudinaryMedia";
import Gutenberg from "./Gutenberg";


function App() {

	return (
	<BlockEditor />
	// <Router>
	// 	<div>
	// 		<Switch>
	// 			<Route path="/block-editor">
	// 				<div>BLOCK</div>
	// 				{/* <BlockEditor /> */}
	// 			</Route>
	// 			<Route path="/cloudinary">
	// 				<CloudinaryMedia />
	// 			</Route>
	// 			<Route path="/gutenberg">
	// 				<Gutenberg />
	// 			</Route>
	// 		</Switch>
	// 	</div>
	// </Router>
	)
}

export default App;
