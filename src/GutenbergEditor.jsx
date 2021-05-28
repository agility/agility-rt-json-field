import React, { useState, useEffect, useRef } from "react"


const Gutenberg = () => {
	const [blocks, updateBlocks] = useState([]);

	useEffect(() => {
		//registerCoreBlocks();
	}, []);

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
			<div id="text-field" ref={containerRef} style={{ backgroundColor: "grey" }}>
				<label>
					Gutenberg:
					<textarea value={value} style={{ width: '300px' }} onChange={(e) => valueChanged(e.target.value)} />
				</label>
			</div>

			<div className="playground">

			</div>

		</div>

	);

}

export default Gutenberg