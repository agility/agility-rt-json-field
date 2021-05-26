
import React, { useState, useEffect, useRef } from "react"
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Quote from '@editorjs/quote'
import Link from '@editorjs/link'
import InlineCode from '@editorjs/inline-code'
import Table from '@editorjs/table'


import { isCompositeComponent } from "react-dom/test-utils";

function App() {
	const [value, setValue] = useState("")
	const [height, setHeight] = useState(500)
	const containerRef = useRef()

	const heightChanged = (h) => {
		if (h === height) return

		setHeight(h)

		if (window.parent) {
			window.parent.postMessage({
				message: h,
				type: 'setHeightCustomField'
			}, "*")
		}

	}

	const valueChanged = (val) => {

		if (val === value) return

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
				inlineCode: {
					class: InlineCode,
					shortcut: 'CMD+SHIFT+M',
				},
				table: {
					class: Table,
				  },
				image: {
					class: ImageTool,
					config: {
						/**
						 * Custom uploader
						 */
						uploader: {
							/**
							 * Upload file to the server and return an uploaded image data
							 * @param {File} file - file selected from the device or pasted by drag-n-drop
							 * @return {Promise.<{success, file: {url}}>}
							 */
							uploadByFile: (file) => {
								console.log("UPLOAD FILE", file)
								// your own uploading logic here
								// return MyAjax.upload(file).then(() => {
								// 	return {
								// 		success: 1,
								// 		file: {
								// 			url: 'https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg',
								// 			// any other image data you want to store, such as width, height, color, extension, etc
								// 		}
								// 	};
								// });
							},

							/**
							 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
							 * @param {string} url - pasted image URL
							 * @return {Promise.<{success, file: {url}}>}
							 */
							uploadByUrl: (url) => {
								console.log("UPLOAD URL", url)
								// your ajax request for uploading
								// return MyAjax.upload(file).then(() => {
								// 	return {
								// 		success: 1,
								// 		file: {
								// 			url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
								// 			// any other image data you want to store, such as width, height, color, extension, etc
								// 		}
								// 	}
								// })
							}
						}
					}
				}
			},
			onChange: () => {

				editor.save().then(outputValue => {
					const v = JSON.stringify(outputValue)
					valueChanged(v)
					heightChanged(containerRef.current.offsetHeight)

				})

			},

		});

		window.addEventListener("message", function (e) {

			//only care about these messages
			if (e.data.type === 'setInitialValueForCustomField') {
				if (value !== e.data.message) {
					setValue(e.data.message)

					editor.isReady.then(() => {
						//wait for the editor to be ready...
						const blocks = JSON.parse(e.data.message)
						editor.render(blocks)
						this.setTimeout(function () {
							heightChanged(containerRef.current.offsetHeight)
						}, 200)

					})
				}
			}
		}, false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<div style={{ background: "#fff", padding: '0 10px' }}>
			<div id="editorjs" ref={containerRef}>

			</div>
		</div>

	);
}

export default App;
