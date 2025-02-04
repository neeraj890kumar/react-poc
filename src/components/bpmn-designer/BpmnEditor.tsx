import { useEffect, useRef, useState } from 'react';
import Modeler from 'bpmn-js/lib/Modeler';
// eslint-disable-next-line import/no-webpack-loader-syntax
import diagramXML from '!!raw-loader!./diagram.bpmn';
import customModdleExtension from './custom.json';
// import PropertiesView from './properties-panel/PropertiesView'

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

const BpmnEditor = () => {
    const container:any = useRef(null);
    const [ modeler, setModeler ]:any = useState(null)
    // let diagramXML = '...';
    let modelerInstance:any = null
  
    useEffect(() => {
      if (modelerInstance) return
  
      modelerInstance = new Modeler({
        container: container.current,
        moddleExtensions: {
          custom: customModdleExtension
        },
        keyboard: {
          bindTo: document.body
        }
      });
      modelerInstance
        .importXML(diagramXML)
        .then(({ warnings }:any) => {
          if (warnings.length) {
            console.warn(warnings);
          }
    
          modelerInstance
            .get("canvas")
            .zoom("fit-viewport");
        });  
  
      setModeler(modelerInstance)
  
      return () => {
        modeler?.destroy();
      }
    }, [])
  
    const handleExport = () => {
      modeler.saveXML({ format: true }).then(({ xml, error }:any) => {
        if (error) {
          console.error(error);
          return;
        }
  
        console.log('UPDATE XML:', xml)
      });
    }
  
    return (
      <div className="modeler-parent">
        <div id="modeler-container" ref={container}></div>
        {/* <div id="properties-container">
          <button onClick={handleExport}>Export BPMN</button>
          {modeler && 
            <PropertiesView modeler={ modeler } />
          }
        </div> */}
      </div>
    );
}

export default BpmnEditor;