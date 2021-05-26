
import React, { useState, useEffect, useRef } from "react"
import EditorJS from '@editorjs/editorjs'

import agilityMgmt from "@agility/content-management";

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'

import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'


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



		const tools = {
			embed: Embed,
			table: Table,
			paragraph: Paragraph,
			list: List,
			warning: Warning,
			code: Code,
			//linkTool: LinkTool,
			image: {
				class: Image,
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
						uploadByFile: async (file) => {
							// your own uploading logic here
							//let fileName = `${new Date().toISOString().replace(/\./g, "").replace(/:/g, "")}-${file.name}`;
							let fileName = "file"
							let fileContent = file


							//TODO: save the image somewhere...

							return {
								success: 1,
								file: {
								  url: 'https://via.placeholder.com/700x300.png',
								  // any other image data you want to store, such as width, height, color, extension, etc
								}
							  }
						},

						/**
						 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
						 * @param {string} url - pasted image URL
						 * @return {Promise.<{success, file: {url}}>}
						 */
						uploadByUrl(url) {
							// your ajax request for uploading
							if (console) console.warn("URL uploads not supported yet...", url)
						}
					}
				}
			},
			raw: Raw,
			header: Header,
			quote: Quote,
			marker: Marker,
			checklist: CheckList,
			delimiter: Delimiter,
			inlineCode: InlineCode,
			simpleImage: SimpleImage
		}


		const editor = new EditorJS({
			/**
			 * Id of Element that should contain Editor instance
			 */
			autofocus: true,
			placeholder: "Enter your Rich Text here",
			holder: 'editorjs',
			tools,
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
