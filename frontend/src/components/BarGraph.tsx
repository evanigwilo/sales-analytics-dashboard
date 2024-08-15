// Chart.js imports for chart setup and configuration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
// React Chart.js wrapper component
import { Bar } from "react-chartjs-2";

// Utility for formatting numbers
import numeral from "numeral";

// Context management for accessing global state
import { useStore } from "@/providers/context";

// Utility for conditional class names
import classnames from "classnames";

// Component for displaying a loading spinner
import { Spinner } from "@/components/Loader";

// Utility function for drawing chart coordinates
import { drawChartCoordinates } from "@/utils/helpers";

// React hook for optimizing performance
import { useMemo } from "react";

// Register Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const BarGraph = () => {
  const { sales, transition, loading } = useStore();

  // Memoize aggregated data to avoid recalculations on each render
  const { categories, totalAmounts } = useMemo(() => {
    const aggregatedData = sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.product.category] =
        (acc[sale.product.category] || 0) + sale.amount;
      return acc;
    }, {});

    return {
      categories: Object.keys(aggregatedData),
      totalAmounts: Object.values(aggregatedData),
    };
  }, [sales]);

  // Chart data configuration
  const chartData: ChartData<"bar"> = {
    labels: categories,
    datasets: [
      {
        data: totalAmounts,
        backgroundColor: "#926bfa",
      },
    ],
  };

  // Chart options configuration
  const chartOptions: ChartOptions<"bar"> = {
    onHover: (event, activeElements) => {
      (event?.native?.target as HTMLElement).style.cursor =
        activeElements.length ? "pointer" : "default";
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "white",
          autoSkip: false,
          font: { family: "Oxygen" },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          padding: 5,
          color: "white",
          autoSkip: false,
          callback: (value) => numeral(value).format("$0a"),
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
        bodyFont: { family: "Oxygen" },
        titleFont: { family: "Oxygen" },
        callbacks: {
          title: (context) => sales[context[0].dataIndex].product.category,
          label: ({ dataIndex }) =>
            `Sales: ${numeral(totalAmounts[dataIndex]).format("$0,0")}`,
        },
      },
      legend: { display: false },
      title: {
        display: true,
        text: "Sales by Category",
        color: "lightgrey",
        font: { family: "Oxygen" },
      },
    },
  };

  return (
    <div
      className={classnames(transition, "sub-content")}
      style={{ height: "100%" }}
      data-testid="bar-graph"
    >
      {loading.sales ? (
        <div className="full-center">
          <Spinner />
        </div>
      ) : (
        <Bar
          data={chartData}
          options={chartOptions}
          plugins={[
            //plugin for custom drawing
            {
              id: "barId",
              beforeDraw: (chart) => drawChartCoordinates(chart, "white"),
            },
          ]}
        />
      )}
    </div>
  );
};

export default BarGraph;
