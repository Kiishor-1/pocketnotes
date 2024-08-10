# MERN Dashboard Application

## Overview

This project is a dashboard application built using the MERN (MongoDB, Express, React, Node.js) stack. The application provides various community metrics such as total members, growth rate, engagement rate, and top contributors. The data is displayed using charts, making it easy to visualize and analyze community metrics.

## Features

- **Dashboard**: Displays community metrics in an organized manner using various charts.
- **Charts**: Includes MemberChart, GrowthChart, EngagementChart, and TopContributorsChart to visualize community metrics.

## File Structure

- **src**
  - **components**
    - **Charts**
      - `MemberChart.jsx`: Displays the total members of the community.
      - `GrowthChart.jsx`: Displays the growth rate of the community.
      - `EngagementChart.jsx`: Displays the engagement rate of the community.
      - `TopContributorsChart.jsx`: Displays the top contributors in the community.
    - **Header**
      - `Header.jsx`: Displays the header with the community name.
    - `Dashboard.jsx`: Main dashboard component that displays all the charts.
  - **store**
    - `communitySlice.js`: Redux slice for managing community metrics state.
  - **App.js**: Main application component.
  - **index.js**: Entry point of the application.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
    ```bash
    cd <project-directory>
3. Install the dependencies:
   ```bash
   npm install

4. Start the development server:
    ```bash
    npm run dev

## Usage
- The application fetches community metrics data from the backend and displays it using various charts on the dashboard.
- Users can navigate to the community chat by clicking the "Go to Community" link on the dashboard.

## Backend
The backend is built using Node.js and Express, providing API endpoints to fetch community metrics data from MongoDB.

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.