import * as React from 'react';
import PanelController from './util/panel-controller'

const App = () => (<p>hi there</p>);

// export default does not work with adobe xd as expected, use export const instead
export const panels = {
    app: new PanelController(App)
}