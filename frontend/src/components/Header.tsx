// React hooks for handling layout and refs
import { useCallback, useLayoutEffect, useRef } from "react";

// Custom hook for handling resize events
import { useResize } from "@/hooks/useResize";

// CSS module for styling the Header component
import styles from "@/styles/Header.module.css";

// Utility for conditionally joining class names
import classNames from "classnames";

// Helper functions for updating CSS properties and styles
import { updateCssProperty, updateCssStyle } from "@/utils/helpers";

// Enum for selection states
import { SelectionState } from "@/utils/types/enum";

// Constants used in the Header component
import { title } from "@/utils/constants";

// Icons used in the Header component
import IconPerson from "@/icons/Person"; // Icon representing a person
import IconSales from "@/icons/Sales"; // Icon representing sales

// Custom hook for detecting mobile devices
import { useMobile } from "@/hooks/useMobile";

// Context management hooks for accessing global state
import { useStore } from "@/providers/context";

const Header = () => {
  const optionsContainerRef = useRef<HTMLDivElement | null>(null);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const previousSelectionIndex = useRef(0);
  const isMobile = useMobile();
  const { transition } = useStore();

  // Handle movement animation for the selection indicator
  const handleSelectionChange = useCallback((currentIndex: number = 0) => {
    const selector = selectorRef.current;
    const optionsContainer = optionsContainerRef.current;

    if (!selector || !optionsContainer) return;

    const previousIndex = previousSelectionIndex.current;
    previousSelectionIndex.current = currentIndex;

    const optionElements = Array.from(
      optionsContainer.children
    ) as HTMLSpanElement[];

    // Reset color of the previous selection
    updateCssStyle(optionElements[previousIndex], { color: "" });

    // Highlight the current selection
    updateCssStyle(optionElements[currentIndex], { color: "white" });

    // Calculate and update the position and width of the selector
    if (currentIndex === previousIndex) {
      updateCssProperty(selector, {
        "--state": SelectionState.SCALE,
        "--left": `calc(${optionElements[previousIndex].offsetLeft}px + ${
          optionElements[previousIndex].clientWidth / 2
        }px)`,
        "--width": "0.2em",
      });
    } else {
      const minIndex = Math.min(previousIndex, currentIndex);
      const maxIndex = Math.max(previousIndex, currentIndex);
      const left = `calc(${optionElements[minIndex].offsetLeft}px + ${
        optionElements[minIndex].clientWidth / 2
      }px)`;
      const width = `${
        optionElements[maxIndex].offsetLeft -
        optionElements[minIndex].offsetLeft -
        optionElements[minIndex].clientWidth / 2 +
        optionElements[maxIndex].clientWidth / 2
      }px`;

      updateCssProperty(selector, {
        "--state": SelectionState.EXPAND,
        "--left": left,
        "--width": width,
      });
    }
  }, []);

  // Setup event listeners and initial state
  useLayoutEffect(() => {
    const optionsElement = optionsContainerRef.current;
    const selectorElement = selectorRef.current;

    // Attach click event listeners to each option
    optionsElement?.childNodes.forEach((child, index) => {
      (child as HTMLSpanElement).onclick = () => handleSelectionChange(index);
    });

    // Reset width after transition
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (
        (event.target as HTMLElement).style.getPropertyValue("--state") ===
        SelectionState.EXPAND
      ) {
        handleSelectionChange(previousSelectionIndex.current);
      }
    };

    selectorElement?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      selectorElement?.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, [handleSelectionChange, isMobile]);

  // Handle resize events
  useResize((isResizing) => {
    if (isResizing) {
      updateCssProperty(selectorRef.current, {
        "--state": SelectionState.EXPAND,
      });
    } else {
      handleSelectionChange(previousSelectionIndex.current);
    }
  });

  const UserSelection = useCallback(
    () => (
      <div>
        <div className={styles.selection} ref={optionsContainerRef}>
          <span className={classNames(styles.select, "hover", "dim")}>
            Dashboard
          </span>
          <span className={classNames(styles.select, "hover", "dim")}>
            Saving Plan
          </span>
          <span className={classNames(styles.select, "hover", "dim")}>
            Credit Cards
          </span>
          <span className={classNames(styles.select, "hover", "dim")}>
            Settings
          </span>
        </div>
        <div className={styles.selector} ref={selectorRef} />
      </div>
    ),
    []
  );

  const Title = () =>
    isMobile ? <IconSales /> : <span className={styles.title}>{title}</span>;

  return (
    <div className={classNames(styles.container, transition)}>
      <Title />
      <UserSelection />
      <IconPerson
        className={classNames("hover", "dim")}
        data-testid="icon-person"
      />
    </div>
  );
};

export default Header;
