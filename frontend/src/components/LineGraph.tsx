// React hooks for managing side effects and refs
import { useEffect, useRef } from "react";

// Date-time manipulation library
import { DateTime } from "luxon";

// Chart.js components and utilities for rendering charts
import {
  Chart as ChartJS, // Core Chart.js class
  CategoryScale, // Scale for categorical data
  LinearScale, // Scale for linear data
  PointElement, // Element for rendering points
  LineElement, // Element for rendering lines
  LineController, // Controller for line charts
  Title, // Plugin for chart titles
  Tooltip, // Plugin for tooltips
  ChartData, // Type for chart data
  Filler, // Element for filling between lines
} from "chart.js";

// Library for formatting numbers
import numeral from "numeral";

// Spinner component for loading indicators
import { Spinner } from "@/components/Loader";

// Utility function for drawing chart coordinates
import { drawChartCoordinates } from "@/utils/helpers";

// Custom hook for detecting mobile devices
import { useMobile } from "@/hooks/useMobile";

// Context management hook for accessing global state
import { useStore } from "@/providers/context";

// Utility for conditionally joining class names
import classnames from "classnames";

// Register Chart.js components and plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler
);

export default function LineGraph() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMobile();
  const { sales, transition, loading } = useStore();

  useEffect(() => {
    const chartElement = chartRef.current;
    if (!chartElement) return;

    const ctx = chartElement.getContext("2d")!;
    const prices = sales.map((sale) => sale.amount);
    const borderColor = "rgb(44, 199, 129)";

    // Create a gradient for the chart background
    const gradient = ctx.createLinearGradient(0, 50, 0, 0);
    gradient.addColorStop(1, borderColor);
    gradient.addColorStop(0, "rgba(44, 199, 129, 0.1)");

    // Calculate the step price for y-axis
    const stepPrice = Math.floor(
      (Math.max(...prices) - Math.min(...prices)) / 4
    );
    const labelOffset = Math.floor(prices.length / (isMobile ? 3 : 5));

    // Generate labels for x-axis
    const labels = prices.map((_, index) =>
      index % labelOffset === 0
        ? DateTime.fromISO(sales[index].date).toFormat("MMM d")
        : ""
    );

    // Prepare chart data
    const chartData: ChartData<"line"> = {
      labels,
      datasets: [
        {
          data: prices,
          tension: 0.2,
          borderWidth: 2,
          borderColor,
          backgroundColor: gradient,
          fill: true,
        },
      ],
    };

    // Initialize the chart
    const lineChart = new ChartJS(ctx, {
      type: "line",
      data: chartData,
      options: {
        onHover: (event, activeEvents) => {
          const target = event?.native?.target as HTMLElement;
          target.style.cursor =
            activeEvents.length > 0 ? "crosshair" : "default";
        },
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          x: {
            ticks: {
              color: "white",
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              font: { family: "Oxygen" },
            },
            grid: { display: false },
            display: true,
          },
          y: {
            display: true,
            ticks: {
              stepSize: Math.max(stepPrice, 1),
              padding: 5,
              color: "white",
              autoSkip: false,
              callback: (value) => numeral(value).format("$0.00a"),
              font: { family: "Oxygen" },
            },
            grid: { drawTicks: false },
          },
        },
        plugins: {
          tooltip: {
            position: "nearest",
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            borderColor: "lightgrey",
            borderWidth: 1,
            displayColors: false,
            padding: 8,
            titleMarginBottom: 4,
            titleFont: { family: "Oxygen" },
            bodyFont: { family: "Oxygen" },
            callbacks: {
              title: (context) =>
                DateTime.fromISO(sales[context[0].dataIndex].date).toFormat(
                  "MMM d"
                ),
              label: ({ dataIndex }) => {
                const { product, amount, region } = sales[dataIndex];
                return [
                  `Price: ${numeral(amount).format("$0,0")}`,
                  `Product: ${product.name}`,
                  `Category: ${product.category}`,
                  `Region: ${region}`,
                ];
              },
            },
          },
          legend: { display: false },
          title: {
            display: true,
            text: "Product Sales",
            color: "lightgrey",
            font: { family: "Oxygen" },
          },
        },
      },
      plugins: [
        //plugin for custom drawing
        {
          id: "lineId",
          beforeDraw: (chart) => drawChartCoordinates(chart, "white"),
        },
      ],
    });

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      lineChart.destroy();
    };
  }, [loading, isMobile]);

  return (
    <div
      className={classnames(transition, "sub-content")}
      style={{ height: "100%" }}
      data-testid="line-graph"
    >
      {loading.sales ? (
        <div className="full-center">
          <Spinner />
        </div>
      ) : (
        <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
}
