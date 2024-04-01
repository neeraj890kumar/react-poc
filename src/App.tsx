import React from 'react';
import logo from './logo.svg';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './App.css';
import JsonTree from './components/JsonTree';
import HorizontalTree from './components/HorizontalTree';
import BpmnEditor from './components/bpmn-designer/BpmnEditor';

function App() {
  
  const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
        },
      },
    },
  };

  const buildTree = (schema:any)=> {
    // Base case: If schema is a leaf node, return it
    if (!schema || typeof schema !== 'object') {
      return { name: schema ? schema.toString() : '' };
    }
  
    // Otherwise, construct the node with its children
    const node:any = { name: schema.title || 'Object', children: [] };
  
    for (const key in schema.properties) {
      const child:any = buildTree(schema.properties[key]);
      child.name = key;
      node.children.push(child);
    }
  
    return node;
  }
  return (
    <div className="App">
      {/* <header className="App-header">

      </header> */}
      <div>
      {/* <svg width="800" height="600"> */}
      {/* <JsonTree data={schema}  x={100} y={50} /> */}
      <BpmnEditor />
      {/* </svg> */}
      {/* <HorizontalTree  data={buildTree(schema)}/> */}
      </div>
    </div>
  );
}

export default App;
