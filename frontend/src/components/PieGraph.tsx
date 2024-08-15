// React hook for memoizing values
import { useMemo } from "react";

// Chart.js components and utilities for rendering charts
import {
  Chart as ChartJS, // Core Chart.js class
  ArcElement, // Element for rendering arcs (used in pie and doughnut charts)
  Title, // Plugin for chart titles
  Legend, // Plugin for chart legends
  Tooltip, // Plugin for tooltips
  ChartOptions, // Type for chart options
} from "chart.js";

// React component for rendering a doughnut chart
import { Doughnut } from "react-chartjs-2";

// Library for formatting numbers
import numeral from "numeral";

// Utility functions for generating colors and batching data
import { generateRandomColors, splitIntoBatches } from "@/utils/helpers";

// CSS module for styling the PieGraph component
import styles from "@/styles/PieGraph.module.css";

// Context management hook for accessing global state
import { useStore } from "@/providers/context";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Title, Legend);

export default function PieGraph() {
  const { sales } = useStore();

  // Aggregate sales data by region
  const aggregatedSales = useMemo(() => {
    return sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.region] = (acc[sale.region] || 0) + sale.amount;
      return acc;
    }, {});
  }, [sales]);

  // Prepare data for the chart
  const [regions, totalAmounts] = useMemo(() => {
    const regions: string[] = [];
    const totalAmounts: number[] = [];

    for (const [region, amount] of Object.entries(aggregatedSales)) {
      regions.push(`${region} - ${numeral(amount).format("$0,0")}`);
      totalAmounts.push(amount);
    }

    return [regions, totalAmounts];
  }, [aggregatedSales]);

  // Split data into batches for pagination
  const batchSize = useMemo(
    () => Math.max(Math.ceil(regions.length / 4), 20),
    [regions.length]
  );
  const regionBatches = useMemo(
    () => splitIntoBatches(regions, batchSize),
    [regions, batchSize]
  );
  const totalAmountBatches = useMemo(
    () => splitIntoBatches(totalAmounts, batchSize),
    [totalAmounts, batchSize]
  );

  // Generate random colors for chart segments
  const chartColors = useMemo(() => generateRandomColors(10, 0.5), [sales]);

  // Define chart options
  const createChartOptions = (index: number): ChartOptions<"doughnut"> => ({
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "nearest",
        intersect: true,
        backgroundColor: "rgba(20, 20, 20, 0.9)",
        borderColor: "lightgrey",
        borderWidth: 1,
        displayColors: true,
        padding: 8,
        titleMarginBottom: 4,
        bodyFont: { family: "Oxygen" },
        titleFont: { family: "Oxygen" },
        callbacks: {
          title: ({ [0]: { dataIndex } }) => sales[dataIndex].region,
          label: ({ dataIndex }) =>
            `Sales: ${numeral(totalAmounts[dataIndex]).format("$0,0")}`,
        },
      },
      legend: {
        align: "start",
        position: "bottom",
        labels: {
          font: { family: "Oxygen" },
          color: "lightgrey",
          sort: (a, b) => {
            const aIndex = a.index ?? 0;
            const bIndex = b.index ?? 0;
            return totalAmounts[bIndex] - totalAmounts[aIndex];
          },
        },
      },
      title: {
        display: true,
        text: `Sales by Region: ${index + 1}`,
        color: "lightgrey",
        font: { family: "Oxygen" },
      },
    },
    onHover: (event, activeEvents) => {
      (event?.native?.target as HTMLElement).style.cursor = activeEvents.length
        ? "pointer"
        : "default";
    },
  });

  // Memoize the maximum height calculation
  const maxHeight = useMemo(() => {
    return Math.max(
      ...regionBatches.map((regions) => (regions.length * 50) / 25),
      30
    );
  }, [regionBatches]);

  return (
    <div className={styles.container}>
      {regionBatches.map((regions, index) => (
        <div key={index}>
          <Doughnut
            options={createChartOptions(index)}
            style={{ height: `${maxHeight}rem` }}
            data={{
              labels: regions,
              datasets: [
                {
                  data: totalAmountBatches[index],
                  backgroundColor: chartColors,
                  borderColor: chartColors,
                },
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}
