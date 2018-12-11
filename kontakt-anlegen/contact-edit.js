(function() {


    const  URL = 'http://localhost:3000/contact';
    const  CSS_URL = 'http://localhost:8081/bare.min.css';

    const template = document.createElement('template');

    template.innerHTML =  `
    <link rel='stylesheet' type="text/css" href='` + CSS_URL + `'>
    <style>
      * {
        font-family: sans-serif;
        color: #2e3538;
      }
      form {
      max-width: 90%;
      }
    </style>
    <h2>Kontakt Erstellen / Bearbeiten</h2>
    <form>
        <div>
            <label for="contactId">Kontaktnummer</label>
            <input type="input" id="contactId" placeholder="Kontaktnummer" disabled>
        </div>
        <div>
            <label for="customername">Name</label>
            <input type="input" id="customername" placeholder="Name">
        </div>
        <div>
            <label for="description">Kurzbeschreibung</label>
            <input type="input" id="description" placeholder="Beschreibung"></input>
        </div>
        <div>
            <label for="contacttype">Kontaktart</label>
            <select id="contacttype">
                <option disabled selected>Kontaktart</option>
                <option>Telefon</option>
                <option>E-Mail</option>
                <option>Persoenlich</option>
            </select>
        </div>
        <div>
            <label for="date">Datum</label>
            <input type="text" id="date" placeholder="Datum"></input>
        </div>
        <div>
            <label for="comment">Kommentar</label>
            <textarea type="textarea" id="comment" placeholder="Kommentar"></textarea>
        </div>
        <div>
            <slot name="save">
                <button id="save" type="button" m-full primary>Speichern</button>
            </slot>
            <slot name="cancle">
                <button id="cancle" type="button" m-full>Abbrechen</button>
            </slot>
        </div>
    </form>
    `;

    class ContactEdit extends HTMLElement {


        constructor() {
            super();
            // Create a shadow root
            this.shadow = this.attachShadow({mode: 'open'});

            // Append instance of Template
            this.shadow.appendChild(template.content.cloneNode(true));

            // Add event listeners
            this.shadow.getElementById('save')
                .addEventListener('click', this.save.bind(this));

            // this.shadowRoot.querySelector('slot[name=cancle]')
            //     .addEventListener('click', this.cancle.bind(this));
        }

        set customername(val) {
            this.setAttribute('customername', val);
        }

        static get observedAttributes() {
            return ['contactid', 'customername', 'description', 'contacttype', 'date', 'comment'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'contactid':
                    this.shadow.getElementById('contactId').value = newValue;
                    break;
                case 'customername':
                    this.shadow.getElementById('customername').value = newValue;
                    break;
                case 'description':
                    this.shadow.getElementById('description').value = newValue;
                    break;
                case 'contacttype':
                    this.shadow.getElementById('contacttype').value = newValue;
                    break;
                case 'date':
                    this.shadow.getElementById('date').value = newValue;
                    break;
                case 'comment':
                    this.shadow.getElementById('comment').value = newValue;
                    break;
            }
        }

        save() {
            let data = this.getData();
            this.sendRequest(data);

            // Raise custom Event contactUpdate
            const event = new CustomEvent('contactUpdate', {
                detail: {
                    customername: this.getValueById('customername')
                },
                bubbles: true,
                cancelable: false
            });
            document.dispatchEvent(event);
        }

        getValueById(id) { const obj =  this.shadowRoot.getElementById(id);
            return obj.value || null; }

        getData() {
            return {
                id:             this.getValueById('contactId'),
                customer:       this.getValueById('customername'),
                description:    this.getValueById('description'),
                type:           this.getValueById('contacttype'),
                date:           this.getValueById('date'),
                comment:        this.getValueById('comment')
            };
        }

        getURL(id) {return id ? URL + '/' + id : URL; }
        getHTTPMethod(id){ return id ? 'PUT' : 'POST'; }

        sendRequest(data) {
            const shouldBeAsync = true;
            const url = this.getURL(data.id);
            const method = this.getHTTPMethod(data.id);

            let request = new XMLHttpRequest();

            request.onload = this.requestCallback;

            request.open(method, url, shouldBeAsync);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.setRequestHeader('Access-Control-Allow-Origin', '*');
            request.send(JSON.stringify(data));
        }

        requestCallback() {
            const event = new CustomEvent('contactUpdate');
            switch (this.status) {
                case 201:
                    window.alert('Kontakt wurde angelegt');
                    document.dispatchEvent(event);
                    break;
                case 200:
                    window.alert('Kontakt wurde aktualisiert');
                    document.dispatchEvent(event);
                    break;
                default:
                    window.alert('Es ist ein Fehler aufgetreten.' + request.status + ' ' + request.responseText);
                    break;
            }
        }


    }
    customElements.define('contact-edit', ContactEdit);
})();
