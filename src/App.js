
import React, { useState, useEffect } from "react"
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

function App() {
	const [value, setValue] = useState("")

	const valueChanged = (val) => {

		if (val === value) return

		console.log("Value changed", value, val)

		setValue(val)
		if (window.parent) {
			console.log("posting message to parent...")
			window.parent.postMessage({
				message: val,
				type: 'setNewValueFromCustomField'
			}, "*")
		} else {
			console.log("can't post message to parent :(")
		}
	}

	useEffect(() => {

		const editor = new EditorJS({
			/**
			 * Id of Element that should contain Editor instance
			 */
			autofocus: true,
			placeholder: "Enter your Rich Text here",
			holder: 'editorjs',
			tools: {
				header: Header,
				list: List,
			},
			onChange: () => {

				editor.save().then(outputValue => {
					const v = JSON.stringify(outputValue)
					valueChanged(v)
				})

			}

		});



		window.addEventListener("message", function (e) {
			console.log("Got message", e.data)
			//only care about these messages
			if (e.data.type === 'setInitialValueForCustomField') {
				console.log("GOT VALUE", e.data.message)
				if (value !== e.data.message) {
					setValue(e.data.message)

					editor.isReady.then(() => {
						console.log("Editor Ready - setting value")
						const blocks = JSON.parse(e.data.message)
						editor.render(blocks)
					})
				}
			}
		}, false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<div className="field-row" style={{background: "#ebebeb"}}>

			<div id="editorjs">

			</div>
		</div>

	);
}

export default App;
