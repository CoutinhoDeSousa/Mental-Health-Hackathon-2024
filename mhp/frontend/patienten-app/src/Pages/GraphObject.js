import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphObject = ({ data, mode }) => {
    const chartRefs = useRef([]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        data.forEach((item, index) => {
            const chartRef = chartRefs.current[index];
            if (!chartRef) return;

            const svg = d3.select(chartRef);
            const width = 800;
            const barHeight = 50;
            const margin = { top: 40, right: 20, bottom: 20, left: 200 };

            svg.selectAll('*').remove(); // Vorherigen Inhalt löschen

            const chartGroup = svg
                .attr('width', width + margin.left + margin.right)
                .attr('height', barHeight + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

            const gradientId = `gradient-${index}`;
            const gradient = svg
                .append('defs')
                .append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%')
                .attr('x2', '100%')
                .attr('y1', '0%')
                .attr('y2', '0%');

            const baseColors = ['#4CAF50', '#FFC107', '#FF5722', '#F44336'];
            const numRanges = item.ranges.length;
            const rangeColors = d3.scaleLinear()
                .domain(d3.range(0, numRanges).map((d) => d / (numRanges - 1)))
                .range(baseColors);

            item.ranges.forEach((range, rangeIndex) => {
                const startX = xScale(range.range[0]);
                const endX = xScale(range.range[1]);
                const midX = (startX + endX) / 2;

                gradient
                    .append('stop')
                    .attr('offset', `${(range.range[0] / 100) * 100}%`)
                    .attr('stop-color', rangeColors(rangeIndex / (numRanges - 1)));

                gradient
                    .append('stop')
                    .attr('offset', `${(range.range[1] / 100) * 100}%`)
                    .attr('stop-color', rangeColors(rangeIndex / (numRanges - 1)));

                chartGroup
                    .append('text')
                    .attr('x', midX)
                    .attr('y', -10)
                    .attr('text-anchor', 'middle')
                    .text(range.label)
                    .style('font-size', '12px')
                    .style('fill', '#333');
            });

            chartGroup
                .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', xScale(100))
                .attr('height', barHeight)
                .attr('rx', 10)
                .attr('fill', `url(#${gradientId})`);

            chartGroup
                .append('circle')
                .attr('cx', xScale(item.value))
                .attr('cy', barHeight / 2)
                .attr('r', 8)
                .attr('fill', '#000')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2);

            chartGroup
                .append('text')
                .attr('x', -10)
                .attr('y', barHeight / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'end')
                .text(item.category)
                .style('font-size', '16px')
                .style('font-weight', 'bold');
        });
    }, [data]);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index} style={{ marginBottom: '40px' }}>
                    {/* Bar Chart */}
                    <svg
                        ref={(el) => (chartRefs.current[index] = el)}
                        style={{ display: 'block', marginBottom: '10px' }}
                    ></svg>

                    {/* Arzt- oder Nicht-Arzt-Text */}
                    <div style={{ marginBottom: '10px', fontSize: '14px', color: '#555' }}>
                        <strong>{mode ? item.texts.arzt : item.texts.nichtArzt}</strong>
                    </div>

                    {/* Dropdown für DiGas */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '10px',
                            background: '#f9f9f9',
                            padding: '10px',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {item.digas.map((diga, digaIndex) => (
                            <div
                                key={digaIndex}
                                style={{
                                    padding: '10px',
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {diga}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GraphObject;
