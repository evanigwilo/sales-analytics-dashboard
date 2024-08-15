// React library for creating components
import React from "react";

// Type definition for Sale object
import { Sale } from "@/utils/types";

// Library for number formatting
import numeral from "numeral";

// CSS module for styling the Row component
import styles from "@/styles/Row.module.css";

// Hook for detecting mobile view
import { useMobile } from "@/hooks/useMobile";

// Utility for conditionally applying CSS classes
import classnames from "classnames";

// Define types for props
interface RowProps {
  sale?: Sale;
  count?: number;
}

// Functional component with memoization
const Row: React.FC<RowProps> = React.memo(({ sale, count }) => {
  const isMobile = useMobile();

  // Render headers if sale data is not provided
  if (!sale) {
    return (
      <div className={styles.container}>
        <span>#</span>
        <span>Product</span>
        <span>Category</span>
        <span>Sales</span>
        {!isMobile && (
          <>
            <span>Region</span>
            <span>Date</span>
          </>
        )}
      </div>
    );
  }

  // Render sale data
  return (
    <div className={classnames(styles.container, "hover")}>
      <span>{count}</span>
      <span>{sale.product.name}</span>
      <span>{sale.product.category}</span>
      <span>{numeral(sale.amount).format("$0.00a")}</span>
      {!isMobile && (
        <>
          <span>{sale.region}</span>
          <span>{sale.date}</span>
        </>
      )}
    </div>
  );
});

export default Row;
