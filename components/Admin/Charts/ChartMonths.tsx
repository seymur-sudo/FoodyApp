import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data3 } from "../../Admin/Charts/ChartDatas";

const ChartMonths = () => {
  return (
   
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            // width={500}
            // height={300}
            data={data3}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Expense" fill="#ff3737" />
            <Bar dataKey="Income" fill="#05b4ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
  );
};

export default ChartMonths;
