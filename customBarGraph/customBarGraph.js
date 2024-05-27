export class customBarGraph extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["timeSpent", "averageTimeSpent"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attribute] = Number(newValue);
            this.updateBarGraph();
        }
    }

    connectedCallback() {
        this.timeSpent = Number(this.getAttribute('timeSpent')) || 0;
        this.averageTimeSpent = Number(this.getAttribute('averageTimeSpent')) || 0;

        this.innerHTML = /*html*/`
        <style>
            .bargraph {
                width: 1000px;
                max-width: 90%;
                height: 200px;
                background: #efefef;
                border: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: left;
                border-radius: 10px;
                flex-direction: column;
                margin: 10px;
                padding: 10px;  
            }

            .timeSpent {
                width: 0px;
                height: 30px;
                background: #006791;
                display: flex;
                justify-content: center;
                align-items: center;
                color: blue;
                font-size: 1.5em;
                margin-bottom: 10px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            .timeSpentText {
                margin-bottom: 10px;
            }

            .averageTimeSpent {
                width: 0px;
                max-width: 90%;
                height: 30px;
                background: #05BFAD;
                display: flex;
                justify-content: center;
                align-items: center;
                color: darkblue;
                font-size: 1.5em;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            .averageTimeSpentText {
                margin-bottom: 10px;
            }

            .user-icon {
                width: 50px;
                height: 50px;
                margin-bottom: 10px;
            }

            .average-users-icon {
                width: 50px;
                height: 50px;
                margin-bottom: 10px;
            }
        </style>
        <div class="bargraph">
            <img class="user-icon" src="https://i.ibb.co/FV4YVXs/user-svgrepo-com.png" alt="user icon">
            <div class="timeSpent"></div>
            <img class="average-users-icon" src="https://i.ibb.co/Bf6L5Zj/users-group-svgrepo-com.png" alt="users group icon">
            <div class="averageTimeSpent"></div>
        </div>
        `;
        this.updateBarGraph();
    }

    updateBarGraph() {
        const timeSpent = this.timeSpent;
        const averageTimeSpent = this.averageTimeSpent;
        const timeSpentElement = this.querySelector('.timeSpent');
        const averageTimeSpentElement = this.querySelector('.averageTimeSpent');
        let widthContainer = this.getElementsByClassName('bargraph')[0].offsetWidth;
        let averageTimeSpentWidth = widthContainer * 0.9;
        let timeSpentWidth = (timeSpent / averageTimeSpent) * widthContainer * 0.9;
        const finalResult = Math.trunc((timeSpent / averageTimeSpent)*(720*0.9));
        console.log(finalResult);

        if(timeSpentWidth > averageTimeSpentWidth) {
            timeSpentElement.style.width = `${averageTimeSpentWidth}px`;
            averageTimeSpentElement.style.width = `${timeSpent}%`;
        } else {
            timeSpentElement.style.width = `${timeSpent}%`;
            averageTimeSpentElement.style.width = `${averageTimeSpentWidth}px`;
        }


    }
}

window.customElements.define('custom-bar-graph', customBarGraph);
