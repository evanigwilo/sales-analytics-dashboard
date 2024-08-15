# React Sales Analytics Dashboard (RSAD)

[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org)
![React Sales Analytics Dashboard](https://img.shields.io/badge/React-18.x-blue)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=ffffff)](https://graphql.org)

**React Sales Analytics Dashboard (RSAD)** is an interactive dashboard developed with React.js that visualizes sales data through various charts and graphs. It uses Apollo Client for GraphQL queries to a backend server that provides mock sales and category data.

## Features

- **Dashboard Layout**: A clean and intuitive layout with placeholders for charts and data controls.
- **Data Visualization**:
  - Line chart for sales trends.
  - Bar chart comparing sales across product categories.
  - Pie chart showing regional sales contributions.
- **Filter Controls**: Filters for date ranges and product categories.
- **Real-time Updates**: Charts update in real-time when filters are applied.
- **Responsiveness**: Adapts to various screen sizes.
- **Error Handling**: Graceful handling of no data and other edge cases.
- **Performance Optimization**: Uses React performance techniques like memoization and lazy loading.
- **Testing:** Using React Testing Library to ensure components render correctly.
- **Mock Data:** Backend server provides mock sales and category data through a GraphQL API.

## Architecture

### High-level Architecture

- **Frontend:** React.js application that queries the backend server using Apollo Client.
- **Backend:** Simple GraphQL server built with Apollo Server, providing mock sales and category data.

<p align="middle">
  <img src="/capture/1.jpg" width="100%" height='512px' />
  <img src="/capture/2.jpg" width="48%" height='512px' />
  <img src="/capture/3.jpg" width="48%" height='512px' />
</p>


## Technologies Used

- **Frontend**:
  - [React.js](https://reactjs.org) with functional components and hooks.
  - [Chart.js](https://www.chartjs.org) with [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) for data visualization.
  - [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL data fetching.
  - [Luxon](https://moment.github.io/luxon/) for date handling.
- **Backend**:
  - Simple GraphQL server using [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to handle queries.
- **Styling**: CSS Modules for scoped styling.

### GraphQL Resolvers

| Resolvers             | Description                                              |
| --------------------- | -------------------------------------------------------- |
| getSales                  | Retrieves sales data, including trends and figures.. |
| getCategories              | Retrieves available product categories for filtering.        

## Project Setup

### Prerequisites

- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/) (Supporting compose file version 3)
- A [bash](https://www.gnu.org/software/bash) compatible shell

### Clone the Repository

```bash
# Change to the desired directory
$ cd <desired-directory>

# Clone the repo
$ git clone https://github.com/evanigwilo/sales-analytics-dashboard.git

# Change to the project directory
$ cd sales-analytics-dashboard
```

### Frontend Setup

1. **Environment variables**:

    In the **frontend** directory, change environmental variables file name from `.env.example` to `.env`, configuring necessary environment variables.

2. **Run the Development Server in a container environment**:

    ```bash
    docker-compose --env-file .env -p sales-analytics-dashboard-dev-stack -f docker-compose.dev.yml up --build -d 
    ```
4. **Run Tests** (optional):

    ```bash
    docker-compose --env-file .env -p sales-analytics-dashboard-dev-stack -f docker-compose.test.yml up --build -d 
    ```
5. The web-app will be running at http://localhost:3000.

### Backend Setup

1. **Environment variables**:

    In the **backend** directory, change environmental variables file name from `.env.example` to `.env`, configuring necessary environment variables.

2. **Run the Development Server in a container environment**:

    ```bash
    docker-compose --env-file .env -p sales-analytics-dashboard-dev-stack -f docker-compose.yml up --build -d 
    ```

3. The api-server will be running at http://localhost:4000/v1.

### Useful Commands

- **Frontend Commands**:
  - `npm run compose-dev-up`: Start frontend development containers.
  - `npm run compose-dev-down`: Stop frontend development containers.
  - `npm run compose-test-up`: Start frontend test containers.
  - `npm run compose-test-down`: Stop frontend test containers.
  - 
- **Backend Commands**:
  - `npm run compose-dev-up`: Start backend development containers.
  - `npm run compose-dev-down`: Stop backend development containers.


## References

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Documentation](https://graphql.org/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Luxon Documentation](https://moment.github.io/luxon/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)