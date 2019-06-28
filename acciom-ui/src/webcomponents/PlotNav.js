const plotNav = window.addEventListener('WebComponentsReady', function() {
    const tagName = 'plot-nav';
  
    const template = `
      <style>
        nav.plot-nav {
          align-items: center;
          background-color: #000;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          height: 56px;
          justify-content: flex-start;
          padding: 0 15px;
          width: 100%;
          fill: #ccc;
        }
        .logo {
          background-image: url(
            https://upload.wikimedia.org/wikipedia/commons/5/5a/Accion_U.S._Network_logo.svg);
          height: 30px;
          width: 136px;
        }
        .link {
          box-sizing: border-box;
          align-items: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          padding: 0 10px;
        }
        .link hx-icon {
          color: #ccc;
          font-size: 1.3em;
          height: 24px;
          margin-bottom: 3px;
          width: 20px;
        }
        .link a, #logout a {
          color: #ccc;
          cursor: pointer;
          font-size: 0.7em;
          font-weight: 300;
          text-decoration: none;
          text-transform: uppercase;
        }
        .link-active {
          border-bottom: 5px solid #ce3728;
          border-top: 5px solid #000;
        }
        .flex-fill {
          flex: 1;
        }
        .divider {
          width: 1px;
          height: 70%;
          margin-left: 25px;
          margin-right: 15px;
          background-color: rgba(255, 255, 255, 0.4);
        }
        .app-icon {
          height: 20px;
          width: 20px;
        }
      </style>
      <nav class="plot-nav">
        <img src="./assets/favicon.ico" class="app-icon"/>
        <div class="flex-fill"></div>
        <div class="link">
          <div>
            <img src="./assets/reports.png" class="app-icon"/>
            <a class="link-text" href="/dashboard">Dashboard</a>
          </div>
        </div>
        <div class="link">
          <div>
            <img src="./assets/reports.png" class="app-icon"/>
            <a class="link-text" href="/reports">Reports</a>
          </div>
          
        </div>
        <div class="link"><!-- class="link-active" -->
          <div>
            <img src="./assets/reports.png" class="app-icon"/>
            <a class="link-text" href="/admin">Admin</a>
          </div>
        </div>
        <div class="divider"></div>
        <div class="link">
          <a class="link-text" href="/logout">User: Khazi</a>
        </div>
        <div class="link">
          <a class="link-text" href="/logout">Logout</a>
        </div>
      </nav>
    `;
  
    class PlotNav extends HTMLElement {
      static get is() {
        return tagName;
      }
  
      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = template;
      }
    }
  
    customElements.define(PlotNav.is, PlotNav);
});
  
export { plotNav };