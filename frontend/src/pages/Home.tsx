// React and React-related hooks
import { useEffect, useRef, useState, Suspense, lazy } from "react";

// Context and state management
import { useStore, useDispatch } from "@/providers/context";

// Utility functions and types
import { ActionType } from "@/utils/types/enum";
import { Sale } from "@/utils/types";
import { sleep } from "@/utils/helpers";
import { useQueryData } from "@/hooks/useQueryData";
import { useMobile } from "@/hooks/useMobile";

// Components
import { Spinner } from "@/components/Loader";

// Styles and class names
import styles from "@/styles/Home.module.css";
import classnames from "classnames";

// Lazy load components
const Header = lazy(() => import("@/components/Header"));
const LineGraph = lazy(() => import("@/components/LineGraph"));
const BarGraph = lazy(() => import("@/components/BarGraph"));
const PieGraph = lazy(() => import("@/components/PieGraph"));
const Sales = lazy(() => import("@/components/Sales"));
const Filter = lazy(() => import("@/components/Filter"));

const Home = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const isMobile = useMobile();
  const [isDataVisible, setIsDataVisible] = useState(false);
  const pieGraphContainerRef = useRef<HTMLDivElement | null>(null);

  // Queries for sales and categories
  const salesQuery = useQueryData<Sale[]>("getSales", store.filter);
  const categoriesQuery = useQueryData<Sale[]>("getCategories");

  // Simulate initial UI loading
  useEffect(() => {
    const initializeUI = async () => {
      if (store.loading.ui) {
        await sleep(3);
        dispatch(ActionType.LOADING_UI, false);
        await sleep(0.5);
        dispatch(ActionType.TRANSITION);
        await sleep(0.5);
        setIsDataVisible(true);
      }
    };

    initializeUI();
  }, [store.loading.ui, dispatch]);

  // Handle sales data updates
  useEffect(() => {
    if (isDataVisible) {
      dispatch(ActionType.LOADING_SALES, salesQuery.loading);
      dispatch(ActionType.SALES, salesQuery.data || []);
      dispatch(ActionType.ERROR_SALES, salesQuery.error);
    }
  }, [salesQuery.loading, salesQuery.error, isDataVisible]);

  // Handle categories data updates and scroll
  useEffect(() => {
    if (isDataVisible) {
      dispatch(ActionType.LOADING_CATEGORIES, categoriesQuery.loading);
      dispatch(ActionType.CATEGORIES, categoriesQuery.data || []);
      dispatch(ActionType.ERROR_CATEGORIES, categoriesQuery.error);
    }
  }, [categoriesQuery.loading, categoriesQuery.error, isDataVisible]);

  // Scroll to top when loading state changes
  useEffect(() => {
    if (isDataVisible) {
      pieGraphContainerRef.current?.scrollTo?.({ behavior: "smooth", top: 0 });
    }
  }, [categoriesQuery.loading, salesQuery.loading]);

  // Loading screen while initial UI is being prepared
  if (store.loading.ui) {
    return (
      <div className={styles["loading-ui"]}>
        <Spinner />
      </div>
    );
  }

  // Refresh data
  const handleRefresh = () => {
    salesQuery.refetch();
    categoriesQuery.refetch();
  };

  // Mobile view
  if (isMobile) {
    return (
      <Suspense fallback={<Spinner />}>
        <Header />
        <div
          className={classnames(styles["flex-column"], styles.gap)}
          style={{
            height: "90vh",
            overflowY: "auto",
            overflowX: "hidden",
            margin: "1rem 0",
          }}
        >
          <Filter onRefresh={handleRefresh} />
          <div style={{ width: "100%" }}>
            <LineGraph />
          </div>
          <div style={{ width: "100%" }}>
            <BarGraph />
          </div>
          <Sales />
          <div
            className={classnames(store.transition, "sub-content")}
            style={{ width: "100%" }}
          >
            <PieGraph />
          </div>
        </div>
      </Suspense>
    );
  }

  // Desktop view
  return (
    <Suspense fallback={<Spinner />}>
      <Header />
      <div className={styles.controls}>
        <div className={styles["flex-column"]}>
          <h2>Dashboard</h2>
          <small className="dim">Hi, here are your financial stats</small>
        </div>
        <Filter onRefresh={handleRefresh} />
      </div>
      <div
        className={classnames(styles.flex, styles.gap)}
        style={{ height: "80vh", width: "100%" }}
      >
        <div
          className={classnames(styles["flex-column"], styles.gap)}
          style={{ width: "calc(65% - 0.5rem)", height: "100%" }}
        >
          <div
            className={classnames(styles["line-bar"], styles.gap)}
            style={{ width: "100%", height: "calc(50% - 0.5rem)" }}
          >
            <div style={{ width: "calc(50% - 0.5rem)", height: "100%" }}>
              <LineGraph />
            </div>
            <div style={{ width: "calc(50% - 0.5rem)", height: "100%" }}>
              <BarGraph />
            </div>
          </div>
          <div style={{ width: "100%", height: "calc(50% - 0.5rem)" }}>
            <Sales />
          </div>
        </div>

        <div
          ref={pieGraphContainerRef}
          data-testid="pie-graph"
          className={classnames(store.transition, "sub-content")}
          style={{
            width: "calc(35% - 0.5rem)",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {store.loading.sales ? (
            <div className="full-center">
              <Spinner />
            </div>
          ) : (
            <PieGraph />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
