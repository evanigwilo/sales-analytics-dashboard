// React library
import React, { useMemo } from "react";

// Components
import Row from "@/components/Row";
import { Spinner } from "@/components/Loader";

// Utility libraries
import { FixedSizeList as List } from "react-window";
import classNames from "classnames";

// Styles
import styles from "@/styles/Sales.module.css";

// Providers
import { useStore } from "@/providers/context";

// Define types for props
interface RenderRowProps {
  index: number;
  style: React.CSSProperties;
}

const Sales: React.FC = () => {
  const { sales, loading, transition } = useStore();

  // Memoize sorted sales by amount to avoid recalculating on each render
  const sortedSales = useMemo(
    () => [...sales].sort((a, b) => b.amount - a.amount),
    [sales]
  );

  // Render function for each row with proper typing
  const renderRow = ({ index, style }: RenderRowProps) => (
    <div style={style} key={index} data-testid={`sales-item-${index}`}>
      <Row sale={sortedSales[index]} count={index + 1} />
    </div>
  );

  return (
    <div
      className={classNames(styles.container, transition, "sub-content")}
      data-testid="sales-table"
    >
      {/* Header */}
      <Row />

      {/* Virtualized List or Sales info */}
      {loading.sales ? (
        <div className="full-center">
          <Spinner />
        </div>
      ) : !sales.length ? (
        <div className="full-center">
          <small>No Sales.</small>
        </div>
      ) : (
        <List
          height={500} // Height of the visible part of the list
          itemCount={sortedSales.length}
          itemSize={50} // Height of each row
          width="100%" // Width of the list
        >
          {renderRow}
        </List>
      )}
    </div>
  );
};

export default Sales;
