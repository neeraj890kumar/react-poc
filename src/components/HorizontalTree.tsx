import React from 'react';
import { Tree as RD3Tree } from 'react-d3-tree';

const HorizontalTree = ({ data }:any) => {
  const treeData = {
    name: 'Root',
    children: data.children || [],
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RD3Tree
        data={treeData}
        orientation="horizontal"
        pathFunc={'elbow'}
        separation={{ siblings: 1, nonSiblings: 2 }}
        translate={{ x: 100, y: 300 }}
        collapsible={true}
        depthFactor={0}
      />
    </div>
  );
};

export default HorizontalTree;