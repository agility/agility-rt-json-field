import React, { useEffect, useRef } from "react"

//TODO: look at this: https://github.com/appleple/smartblock/

 import '@wordpress/components/build-style/style.css';
 import '@wordpress/block-editor/build-style/style.css';
import {
	BlockEditorProvider,
	BlockList,
	BlockTools,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { SlotFillProvider, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

const Gutenberg = () => {

	const [value, setValue] = React.useState("")
	const [height, setHeight] = React.useState(500)
	const [blocks, updateBlocks] = useState([]);


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

	const uploadMedia = () => {
		var myWidget = window.cloudinary.createUploadWidget({
			cloudName: 'agility-cms',
			uploadPreset: 'welh89ma'
		}, (error, result) => {
			if (error) {
				console.error("Upload didn't work", error)
			} else if (result && result.event === "success") {

				console.log('Done! Here is the image info: ', result.info);
				const json = JSON.stringify(result.info)
				valueChanged(json)
			}
		});

		myWidget.open();



	}



	useEffect(() => {
		console.log(window.cloudinary)
		if (window.cloudinary === undefined) {
			console.log("LOADING CLOUDINARY")
			const script = document.createElement('script');
			script.src = 'https://upload-widget.cloudinary.com/global/all.js';
			script.async = true
			document.body.appendChild(script);
			script.onload = () => {
				console.log("Cloudinary is up!")
			}
		}

		window.addEventListener("message", function (e) {

			//only care about these messages
			if (e.data.type === 'setInitialValueForCustomField') {
				if (value !== e.data.message) {
					setValue(e.data.message)
				}
			}
		}, false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		<div style={{ background: "#fff", padding: '0 10px' }}>
			{/* <div id="cloudinary-container" ref={containerRef}>
				<label>
					Cloudinary field:
					<textarea value={value} style={{ width: '300px' }} onChange={(e) => valueChanged(e.target.value)} />
				</label>
			</div> */}
			<div>

				<BlockEditorProvider
					value={blocks}
					onInput={(blocks) => updateBlocks(blocks)}
					onChange={(blocks) => updateBlocks(blocks)}
				>
					<SlotFillProvider>
						<BlockTools>
							<WritingFlow>
								<ObserveTyping>
									<BlockList />
								</ObserveTyping>
							</WritingFlow>
						</BlockTools>
						<Popover.Slot />
					</SlotFillProvider>
				</BlockEditorProvider>

			</div>
		</div>

	);

}

export default Gutenberg