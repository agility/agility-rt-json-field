var app = new Vue({
    el: '#app',
    data: {
      value: null
    },
    methods: {

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