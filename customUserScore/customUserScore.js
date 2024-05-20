export class customUserScore extends HTMLElement {
    constructor() {
        super();
        this.userID;
        this.loading = true;

        this.url = "https://academy.turiscool.com/admin/api/"
        this.token = "Bearer 17xa7adwlycG4qrbRatBdCHW41xtl9jNyaBq4d45";
        this.lwId = "62b182eea31d8d9863079f42";
        this.requestOptions = {
            method: "GET",
            headers: {
                Authorization: this.token,
                "Content-Type": "application/json",
                "Lw-Client": this.lwId,
            },
        };

        this.progress = [];
        this.filterData = {};
    }

    static get observedAttributes() {
        return ["user-id"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (attribute) {
                case "user-id":
                    this.userID = newValue;
                    this.fetchProgress();
                    break;
            }
        }
    }

    fetchProgress() {
        this.loading = true;
        this.updateContent();

        fetch(`${this.url}/v2/users/${this.userID}/progress`, this.requestOptions)
        .then(response => response.json())
        .then(progressData => {
            this.progress = progressData.data;
            this.calculateFilterData();
            this.loading = false;
            this.updateContent();
        })
        .catch(error => {
            console.error('Error fetching progress:', error);
            this.loading = false;
            this.updateContent();
        });
    }

    calculateFilterData() {
        let totalTime = 0;
        let totalUnitsCompleted = 0;
        let totalCoursesCompleted = 0;
        let totalUnits = 0;
        let average = 0;

        for (let i = 0; i < this.progress.length; i++) {
            for (let j = 0; j < this.progress[i].length; j++) {
                totalUnits += this.progress[i][j].total_units;
                totalTime += this.progress[i][j].time_on_course;
                totalUnitsCompleted += this.progress[i][j].completed_units;
                if (this.progress[i][j].progress_rate === 100) {
                    totalCoursesCompleted++;
                    average += this.progress[i][j].average_score_rate / 10;
                }
            }
        }

        average = totalCoursesCompleted > 0 ? average / totalCoursesCompleted : 0;

        this.filterData = {
            totalTime: totalTime,
            totalUnitsCompleted: totalUnitsCompleted,
            totalUnits: totalUnits,
            average: average
        };
    }

    updateContent() {
        if (this.loading) {
            this.innerHTML = `<div class="loading">Cargando...</div>`;
        } else {
            this.innerHTML = `
            <div class="userProgress">
                <h2>Este es tu resumen de todos tus cursos:</h2>
                <div class="progress">
                    <div id="totalTime">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>                
                        ${this.filterData.totalTime} min
                    </div>
                    <div id="totalUnitsCompleted">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>                
                        ${this.filterData.totalUnitsCompleted} / ${this.filterData.totalUnits}
                    </div>
                    <div id="average">
                        <svg viewBox="0 0 800 800" enable-background="new 0 0 800 800" id="GUIDE" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path d="M676.637,183.386c0.002-0.002,0.004-0.004,0.005-0.005L522.549,29.287c-3.619-3.62-8.62-5.86-14.145-5.86H137.5 c-11.046,0-20,8.954-20,20v713.146c0,11.046,8.954,20,20,20h525c11.046,0,20-8.954,20-20V197.522 C682.5,192.407,680.426,187.203,676.637,183.386z M642.5,736.573h-485V63.427h342.62l114.096,114.095l-85.812,0v-41.788 c0-11.046-8.954-20-20-20s-20,8.954-20,20v61.788c0,11.046,8.954,20,20,20c0,0,92.404,0,134.096,0V736.573z"></path>
                                    <path d="M295.217,224.417l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.284 l19.84,19.84c3.75,3.751,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.999 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,216.606,303.027,216.606,295.217,224.417z"></path>
                                    <path d="M557.831,312.557h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,312.557,557.831,312.557z"></path>
                                    <path d="M367.389,272.557c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20s-8.954-20-20-20H367.389z"></path>
                                    <path d="M557.831,435.552h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,435.552,557.831,435.552z"></path>
                                    <path d="M496.998,395.552H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,395.552,496.998,395.552z"></path>
                                    <path d="M557.831,558.547h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,558.547,557.831,558.547z"></path>
                                    <path d="M496.998,518.547H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,518.547,496.998,518.547z"></path>
                                    <path d="M557.831,681.542h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,681.542,557.831,681.542z"></path>
                                    <path d="M496.998,641.542H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,641.542,496.998,641.542z"></path>
                                    <path d="M255.363,435.552c5.304,0,10.392-2.107,14.142-5.858l53.996-53.996c7.811-7.811,7.811-20.475,0-28.285 s-20.473-7.811-28.283,0l-39.854,39.855l-5.697-5.698c-7.81-7.81-20.474-7.812-28.284-0.001s-7.811,20.474-0.001,28.284 l19.84,19.841C244.972,433.444,250.059,435.552,255.363,435.552z"></path>
                                    <path d="M234.239,511.547l-12.856,12.857c-7.81,7.811-7.81,20.474,0.001,28.284c3.905,3.905,9.023,5.857,14.142,5.857 s10.237-1.952,14.143-5.858l12.855-12.855l12.856,12.855c3.904,3.906,9.023,5.858,14.142,5.858s10.237-1.952,14.142-5.858 c7.811-7.811,7.811-20.473,0-28.283l-12.855-12.857l12.856-12.857c7.81-7.811,7.81-20.474-0.001-28.284 c-7.811-7.81-20.474-7.81-28.284,0.001l-12.856,12.856l-12.857-12.856c-7.811-7.811-20.473-7.811-28.283,0s-7.811,20.474,0,28.283 L234.239,511.547z"></path>
                                    <path d="M295.217,593.4l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.283 l19.84,19.84c3.75,3.752,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.998 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,585.59,303.027,585.59,295.217,593.4z"></path>
                                </g>
                            </g>
                        </svg>   
                        ${this.filterData.average} / 10
                    </div>
                </div>
            </div>`;
        }
    }

    connectedCallback() {
        this.updateContent();
    }
}

window.customElements.define('custom-user-score', customUserScore);
