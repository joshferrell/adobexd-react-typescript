import PanelController from './util/panel-controller'

import App from './app';

// export default does not work with adobe xd as expected, use export const instead
export const panels = {
    app: new PanelController(App)
}