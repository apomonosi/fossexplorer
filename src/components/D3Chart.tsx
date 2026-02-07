import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface D3ChartProps {
  width?: number;
  height?: number;
}

/**
 * Minimal D3 + React component to verify the integration works.
 * Replace this with your actual visualization components.
 */
export default function D3Chart({ width = 600, height = 400 }: D3ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const sampleData = [40, 80, 150, 100, 200, 130, 170];

    const xScale = d3
      .scaleBand()
      .domain(sampleData.map((_, i) => String(i)))
      .range([40, width - 20])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampleData) ?? 0])
      .nice()
      .range([height - 30, 20]);

    svg
      .selectAll('rect')
      .data(sampleData)
      .join('rect')
      .attr('x', (_, i) => xScale(String(i)) ?? 0)
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(0) - yScale(d))
      .attr('rx', 4)
      .attr('fill', '#38bdf8');

    svg
      .append('g')
      .attr('transform', `translate(0,${height - 30})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('fill', '#94a3b8');

    svg
      .append('g')
      .attr('transform', 'translate(40,0)')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .attr('fill', '#94a3b8');

    svg.selectAll('.domain, .tick line').attr('stroke', '#334155');
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ background: '#1e293b', borderRadius: '8px' }}
    />
  );
}
