import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphObject = ({ data, mode }) => {
    const chartRefs = useRef([]);

    useEffect(() => {
        if (!data || data.length === 0) return;
        console.log(data)
        const updateCharts = () => {
            const containerWidth = document.body.clientWidth;
            const width = containerWidth > 768 ? 800 : containerWidth - 40;
            const barHeight = 50;
            const margin = { top: 40, right: 20, bottom: 40, left: width > 600 ? 200 : 100 };

            const globalMax = d3.max(data.flatMap((item) => item.ranges.map((r) => r.range[1])));

            data.forEach((item, index) => {
                const chartRef = chartRefs.current[index];
                if (!chartRef) return;

                const svg = d3.select(chartRef);
                svg.selectAll("*").remove();

                const chartGroup = svg
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", barHeight + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

                const xScale = d3.scaleLinear().domain([0, globalMax]).range([0, width]);

                const gradientId = `gradient-${index}`;
                const gradient = svg
                    .append("defs")
                    .append("linearGradient")
                    .attr("id", gradientId)
                    .attr("x1", "0%")
                    .attr("x2", "100%")
                    .attr("y1", "0%")
                    .attr("y2", "0%");

                const baseColors = ["#4CAF50", "#FFC107", "#FF5722", "#F44336"];
                item.ranges.forEach((range, rangeIndex) => {
                    const startOffset = (range.range[0] / globalMax) * 100;
                    const endOffset = (range.range[1] / globalMax) * 100;

                    gradient
                        .append("stop")
                        .attr("offset", `${startOffset}%`)
                        .attr("stop-color", baseColors[rangeIndex % baseColors.length]);

                    gradient
                        .append("stop")
                        .attr("offset", `${endOffset}%`)
                        .attr("stop-color", baseColors[rangeIndex % baseColors.length]);

                    chartGroup
                        .append("text")
                        .attr("x", xScale((range.range[0] + range.range[1]) / 2))
                        .attr("y", -10)
                        .attr("text-anchor", "middle")
                        .text(range.label.length > 15 ? range.label.slice(0, 12) + "..." : range.label)
                        .style("font-size", "12px")
                        .style("fill", "#333");
                });

                chartGroup
                    .append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", xScale(globalMax))
                    .attr("height", barHeight)
                    .attr("rx", 10)
                    .attr("fill", `url(#${gradientId})`);

                chartGroup
                    .append("circle")
                    .attr("cx", xScale(item.score))
                    .attr("cy", barHeight / 2)
                    .attr("r", 8)
                    .attr("fill", "#000")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 2);

                chartGroup
                    .append("text")
                    .attr("x", -10)
                    .attr("y", barHeight / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "end")
                    .text(item.category)
                    .style("font-size", "16px")
                    .style("font-weight", "bold");
            });
        };

        updateCharts();
        window.addEventListener("resize", updateCharts);

        return () => {
            window.removeEventListener("resize", updateCharts);
        };
    }, [data]);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index} style={{marginBottom: "40px"}}>
                    <svg
                        ref={(el) => (chartRefs.current[index] = el)}
                        style={{display: "block", marginBottom: "10px"}}
                    ></svg>

                    {mode && (
                        <div style={{marginBottom: "10px", fontSize: "14px", color: "#555"}}>
                            <strong>Empfehlung:</strong>{" "}
                            {item.current_range?.recommendation || "Keine Empfehlung verfügbar"}
                        </div>
                    )}
                    {mode && (
                        <div style={{marginBottom: "10px", fontSize: "14px", color: "#555"}}>
                            <strong>Hinweise:</strong> {item.current_range?.label || "Keine Hinweise verfügbar"}
                        </div>
                    )}

                    <div
                        id="digas"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gap: "10px",
                            background: "#f9f9f9",
                            padding: "10px",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >

                        {item.current_range?.digas?.length > 0 ? (
                            item.current_range.digas.map((diga, digaIndex) => (
                                <a
                                    key={digaIndex}
                                    href={diga.diga_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: "10px",
                                        background: "#fff",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                        textDecoration: "none",
                                        color: "#333",
                                    }}
                                >
                                    {diga.diga_name}
                                </a>
                            ))
                        ) : (
                            <p style={{textAlign: "center", color: "#888", marginTop: "10px"}}>
                                Keine DIGAs verfügbar
                            </p>
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default GraphObject;
