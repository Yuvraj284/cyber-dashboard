import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ForensicCityMap } from "./components/ForensicCityMap";
import { SleeperHeatmap } from "./components/SleeperHeatmap";
import { DynamicSchemaConsole } from "./components/DynamicSchemaConsole";
import { AssetRegistry } from "./components/AssetRegistry";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ForensicCityMap },
      { path: "map", Component: ForensicCityMap },
      { path: "heatmap", Component: SleeperHeatmap },
      { path: "schema", Component: DynamicSchemaConsole },
      { path: "registry", Component: AssetRegistry },
    ],
  },
]);
