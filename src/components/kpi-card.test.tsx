import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { KpiCard } from "./kpi-card";

test("renders the label, compact value, and signed delta", () => {
  render(
    <KpiCard label="Followers" metric={{ value: 12400, delta: 0.05 }} />,
  );

  expect(screen.getByText("Followers")).toBeInTheDocument();
  expect(screen.getByText("12.4K")).toBeInTheDocument();
  expect(screen.getByText("+5%")).toBeInTheDocument();
});

test("shows a fallback when there is no prior window", () => {
  render(
    <KpiCard
      label="Posts"
      metric={{ value: 12, delta: null }}
      format="integer"
    />,
  );

  expect(screen.getByText("12")).toBeInTheDocument();
  expect(screen.getByText("No prior window")).toBeInTheDocument();
});
