// Import required modules
import { ApolloError } from "@apollo/client";
import { Chart } from "chart.js";

/**
 * Converts seconds to milliseconds.
 * @param secs - The number of seconds to convert.
 * @returns The equivalent number of milliseconds.
 */
export const secsToMs = (secs: number): number => secs * 1000;

/**
 * Creates a promise that resolves after a specified number of seconds.
 * @param secs - The number of seconds to wait before resolving.
 * @returns A promise that resolves after the specified delay.
 */
export const sleep = (secs: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, secsToMs(secs)));

/**
 * Updates the CSS styles of an HTML element.
 * @param element - The HTML element whose styles will be updated. Can be null or undefined.
 * @param styles - An object containing CSS property-value pairs to apply to the element.
 */
export const updateCssStyle = (
  element: HTMLElement | null | undefined,
  styles: Partial<CSSStyleDeclaration>
): void => {
  if (element) {
    Object.assign(element.style, styles);
  }
};

/**
 * Updates specific CSS properties of an HTML element.
 * @param element - The HTML element whose properties will be updated. Can be null or undefined.
 * @param styles - An object containing CSS property-value pairs to apply to the element.
 */
export const updateCssProperty = (
  element: HTMLElement | null | undefined,
  styles: Record<string, string>
): void => {
  if (element) {
    Object.entries(styles).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  }
};

/**
 * Draws dashed lines on a chart at the tooltip's x and y coordinates.
 * @param chart - The Chart.js chart instance on which to draw the lines.
 * @param strokeColor - Optional color of the dashed lines. Defaults to 'white'.
 */
export const drawChartCoordinates = (
  chart: Chart,
  strokeColor?: string
): void => {
  if (chart.tooltip?.dataPoints) {
    const { x, y } = chart.tooltip.dataPoints[0].element;
    const { y: yAxis, x: xAxis } = chart.scales;
    const ctx = chart.ctx;

    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = strokeColor || "white";

    // Draw vertical dashed line
    ctx.beginPath();
    ctx.moveTo(x, yAxis.top);
    ctx.lineTo(x, yAxis.bottom);
    ctx.stroke();

    // Draw horizontal dashed line
    ctx.beginPath();
    ctx.moveTo(xAxis.left, y);
    ctx.lineTo(xAxis.right, y);
    ctx.stroke();

    ctx.restore();
  }
};

/**
 * Generates an array of random colors in RGBA format with optional opacity.
 * @param count - The number of random colors to generate.
 * @param opacity - The opacity value for the colors, between 0 and 1. Defaults to 1.
 * @returns An array of color strings in RGBA format.
 */
export const generateRandomColors = (
  count: number,
  opacity: number = 1
): string[] => {
  opacity = Math.max(0, Math.min(opacity, 1)); // Ensure opacity is between 0 and 1

  // Generates a random HSL color
  const generateRandomHSLColor = (hue: number): string => {
    const h = (hue + Math.floor(Math.random() * 30)) % 360;
    const s = 70 + Math.random() * 30;
    const l = 50 + Math.random() * 10;
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
  };

  const step = Math.floor(360 / count); // Step size for distinct hues

  return Array.from({ length: count }, (_, i) => {
    const hue = i * step;
    return generateRandomHSLColor(hue);
  });
};

/**
 * Splits an array into chunks of a specified size.
 * @param array - The array to split.
 * @param size - The size of each chunk.
 * @returns An array of arrays, where each sub-array is a chunk of the original array.
 */
export const splitIntoBatches = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * Formats error messages from Apollo Client.
 * @param error - The Apollo error object containing network or GraphQL errors.
 * @param query - The GraphQL query that caused the error, used for custom error messages.
 * @returns An object with an optional error ID and a formatted error message.
 */
export const apolloErrorMessage = (
  error: Partial<ApolloError>,
  query: string
): { id?: string; message: string } => {
  const networkErrorMessage = error.networkError?.message;
  const graphQLError = error.graphQLErrors?.[0];
  const graphQLErrorMessage = graphQLError?.message;
  const errorExtensions = graphQLError?.extensions;
  const errorId = errorExtensions?.id as string | undefined;

  const formattedMessage =
    networkErrorMessage ||
    (errorExtensions?.[query] as string | undefined) ||
    graphQLErrorMessage ||
    error.message ||
    "";

  return {
    id: errorId,
    message: formattedMessage,
  };
};
