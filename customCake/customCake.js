export class customCake extends HTMLElement {
    constructor() {
        super();
        // Inicializamos 'completed' correctamente.
        this.totalunits;
        this.unitscompleted;
        this.completed;
        this.attachShadow({ mode: 'open' }); // Usamos Shadow DOM para encapsulamiento
    }

    static get observedAttributes() {
        return ["totalunits", "unitscompleted"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (attribute) {
                case "totalunits":
                    this.totalUnits = newValue;
                    break;
                case "unitscompleted":
                    this.unitsCompleted = newValue;
                    this.completed = Math.trunc((this.unitsCompleted / this.totalUnits) * 100);
                    this.updatePieChart();
                    break;

            }
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /*html*/`
    <div class = "piechart-body">
    <div class="piechart">
    </div>
    
    <h3>Completadas: ${this.unitsCompleted}</h3>
    <h3>Total de unidades: ${this.totalUnits}</h3>
    </div>
        `;
        this.updatePieChart(); // Inicializa la visualización correcta del gráfico.
    }

    updatePieChart() {
        const degrees = (this.completed / 100) * 360;
        const pieChart = this.shadowRoot.querySelector('.piechart');
        if (pieChart) {
            pieChart.style.setProperty('--deg', `${degrees}deg`); // Actualiza la variable CSS.
        }
    }
}

window.customElements.define('custom-cake', customCake);
