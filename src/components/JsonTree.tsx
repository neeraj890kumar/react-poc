import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const JsonTree = ({ data, x = 0, y = 0 }:any) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const renderNode = (node:any, parentX:any, parentY:any) => {
      const keys = Object.keys(node);
      console.log('keys',keys)
      const nodeRadius = 20;
      const margin = 50;
      let nextX = parentX;

      keys.forEach((key, index) => {
        const childX = parentX + 3 * nodeRadius + margin;
        const childY = parentY + index * (2 * nodeRadius + margin);

        svg.append('circle')
          .attr('cx', childX - nodeRadius)
          .attr('cy', childY)
          .attr('r', nodeRadius)
          .attr('fill', '#cce5ff');

        svg.append('text')
          .attr('x', childX)
          .attr('y', childY + nodeRadius)
          .attr('text-anchor', 'middle')
          .text(key);

        svg.append('line')
          .attr('x1', parentX + 2 * nodeRadius)
          .attr('y1', parentY + nodeRadius)
          .attr('x2', childX - nodeRadius)
          .attr('y2', childY + nodeRadius)
          .attr('stroke', 'black');

        if (typeof node[key] === 'object') {
          renderNode(node[key], childX, childY);
        }

        nextX += 3 * nodeRadius + margin;
      });
    };

    renderNode(data, x, y);
  }, [data, x, y]);

  return <svg ref={svgRef} width={800} height={600} />;
};

export default JsonTree;