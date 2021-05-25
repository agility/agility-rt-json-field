
var RTJsonField = function() {
    var self = this;
    self.Label = "Rich JSON";
    self.ReferenceName = "RichJSON";
    self.Render = function (options) {
        /// <summary>Function called whenever the form container this Custom Field Type is rendered or refreshed.</summary>
        /// <param name="options" type="Object">
        ///     <field name="$elem" type="jQueryElem">The .field-row jQuery Dom Element.</field>
        ///     <field name="contentItem" type="ContentItem Object">The entire Content Item object including Values and their KO Observable properties of all other fields on the form.</field>
        ///     <field name="fieldBinding" type="KO Observable">The value binding of thie Custom Field Type. Get and set this field's value using this property.</field>
        ///     <field name="fieldSetting" type="Object">Object representing the field's settings such as 'Hidden', 'Label', and 'Description'</field>
        ///     <field name="readonly" type="boolean">Represents if this field should be readonly or not.</field>
        /// </param>

        var url = 'https://joelvarty.github.io/agility-rt-json-field/index.html';
        var iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '500px';
        iframe.src = url
        iframe.onload = function() {

            iframe.contentWindow.postMessage({
                message: ko.unwrap(options.fieldBinding),
                type: 'setInitialValueForCustomField'
            }, url)
        }
        options.$elem.html(iframe);

        window.addEventListener("message", function (e) {

            if (e.data.type === 'setNewValueFromCustomField') {
                options.fieldBinding(e.data.message);
            }

        }, false);



    }
}

ContentManager.Global.CustomInputFormFields.push(new RTJsonField());