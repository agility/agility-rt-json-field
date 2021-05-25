var app = new Vue({
    el: '#app',
    data: {
      value: null
    },
	watch: {
		value: function (val, oldVal) {
			console.log("val changed", val, oldVal)
			if (val !== oldVal) {
				this.setNewValue(val)
			}
		  },
	},
    methods: {
		setNewValue(value) {
            window.postMessage({
                message: value,
                type: 'setNewValueFromCustomField'
            }, "*")
        },
        listen() {
            var self = this;

            window.addEventListener("message", function (e) {

                //only care about these messages
                if(e.data.type === 'setInitialValueForCustomField') {
					console.log("GOT VALUE", e.data.message)
					self.value = e.data.message
				}
            }, false);
        }
    },

    created() {

        this.listen();
    }
  })