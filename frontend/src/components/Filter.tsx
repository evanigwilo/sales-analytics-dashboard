// Date and time handling library
import { DateTime } from "luxon";

// React hook for optimizing performance
import { useMemo } from "react";

// DatePicker component and its styles
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Utility for conditional class names
import classnames from "classnames";

// Context management hooks for accessing and dispatching global state
import { useDispatch, useStore } from "@/providers/context";

// Action types for state management
import { ActionType } from "@/utils/types/enum";

// Components
import { Spinner } from "@/components/Loader"; // Loading spinner component

// Icons
import IconCalendar from "@/icons/Calendar"; // Calendar icon
import IconFilter from "@/icons/Filter"; // Filter icon
import IconRefresh from "@/icons/Refresh"; // Refresh icon

// Styles for the Filter component
import styles from "@/styles/Filter.module.css";

// Custom hook for detecting mobile devices
import { useMobile } from "@/hooks/useMobile";

// Convert luxon DateTime to JavaScript Date
const luxonToDate = (dateTime: DateTime | null): Date | null =>
  dateTime?.toJSDate() || null;

// Convert JavaScript Date to luxon DateTime
const dateToLuxon = (date: Date | null): DateTime | null =>
  date ? DateTime.fromJSDate(date) : null;

const Filter = ({ onRefresh }: { onRefresh?: () => void }) => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const { filter, transition, categories, loading, error } = useStore();
  const errorMessage = error.sales || error.categories;

  // Memoized list of categories
  const categoryOptions = useMemo(() => {
    return ["All", ...Array.from(categories)];
  }, [categories]);

  // Handler for category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    dispatch(ActionType.FILTER, {
      category: selectedCategory === "All" ? "" : selectedCategory,
    });
  };

  // Handler for date change
  const handleDateChange = (
    date: Date | null,
    type: "startDate" | "endDate"
  ) => {
    dispatch(ActionType.FILTER, {
      [type]: dateToLuxon(date),
    });
  };

  return (
    <div style={{ width: isMobile ? "100%" : "unset" }}>
      <div
        className={classnames(
          styles.container,
          styles.flex,
          transition,
          "sub-content"
        )}
        data-testid="filter-by"
      >
        {/* Category Dropdown */}
        <div className={styles.flex}>
          <IconFilter data-testid="icon-filter" />
          {loading.categories ? (
            <Spinner />
          ) : (
            <select
              value={filter.category || "All"}
              onChange={handleCategoryChange}
              className={styles.picker}
              data-testid="category-dropdown"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Date Pickers */}
        <div className={styles.flex}>
          <IconCalendar data-testid="icon-calender" />
          <DatePicker
            selected={luxonToDate(filter.startDate)}
            onChange={(date) => handleDateChange(date, "startDate")}
            placeholderText="Start Date"
            dateFormat="MMMM d, yyyy"
            className={styles.picker}
          />
          <span className="dim"> - </span>
          <DatePicker
            selected={luxonToDate(filter.endDate)}
            onChange={(date) => handleDateChange(date, "endDate")}
            placeholderText="End Date"
            dateFormat="MMMM d, yyyy"
            className={styles.picker}
          />

          {/* Refresh Button */}
          <div title="Refresh" className={styles.refresh}>
            <IconRefresh onClick={onRefresh} data-testid="icon-refresh" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default Filter;
