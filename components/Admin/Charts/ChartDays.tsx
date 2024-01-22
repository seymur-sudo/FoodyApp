import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { ReactElement } from "react";
import { DataBubble } from "../../../interfaces/index";
import { data01, data02,data03 } from "../../Admin/Charts/ChartDatas";

const parseDomain = (): [number, number] => [
  0,
  Math.max(
    Math.max(...data01.map((entry) => entry.value)),
    Math.max(...data02.map((entry) => entry.value)),
    Math.max(...data03.map((entry) => entry.value))

  ),
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: DataBubble }>;
}

const renderTooltip = (props: CustomTooltipProps): ReactElement | null => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>{data?.hour}</p>
        <p>
          <span>value: </span>
          {data?.value}
        </p>
      </div>
    );
  }

  return null;
};

export const ChartWeek: React.FC = () => {
  const domain = parseDomain();
  const range = [16, 225];

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={50}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="monday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Monday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="tuesday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Tuesday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#d884d4" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="wednesday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "W_day", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data03} fill="#84d8b6" />
        </ScatterChart>
      </ResponsiveContainer>

      
      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="thursday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Thursday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#84d1d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="friday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Friday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#c484d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="saturday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Saturday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data03} fill="#42aa0e" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="sunday"
            height={40}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Sunday", position: "insideRight" }}
          />

          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
