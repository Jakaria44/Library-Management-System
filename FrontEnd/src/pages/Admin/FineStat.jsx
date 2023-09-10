import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const FineStat = () => {
  const [year, setYear] = useState("2023");
  const [options, setOptions] = useState([]);
  const [dataRent, setDataRent] = useState([]); //[{year:2021, data:[]}
  const [dataReturn, setDataReturn] = useState([]); //[{year:2021, data:[]
  const [res, setRes] = useState([
    {
      year: null,
      data: [],
    },
  ]);
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    extractData(year);
  }, [year]);
  useEffect(() => {
    if (res.length > 0) {
      extractData(year);
    }
  }, [res, year]);
  const extractData = (y) => {
    const a = res
      .find((item) => item.year == y)
      ?.data?.map((mon) => ({
        month: parseInt(mon.MONTH),
        rentCount: mon.FINE_COUNT,
        returnCount: mon.PAYMENT_COUNT,
      }));

    let rent = [],
      returnC = [];
    for (let i = 1; i <= 12; i++) {
      const c = a?.find((item) => item.month === i);
      rent.push(c?.rentCount || 0);
      returnC.push(c?.returnCount || 0);
    }
    setDataReturn(returnC);
    setDataRent(rent);
  };
  const load = async () => {
    try {
      const res = await server.get("/fine-data");
      const a = res.data?.map((item) => {
        return {
          year: item.YEAR,
          data: JSON.parse(item.DATA),
        };
      });
      console.log(a);

      setOptions(a?.map((item) => item.year));

      setRes(a);
      setYear(a[1].year);
    } catch (e) {
      console.log(e);
      setRes([]);
    }
  };

  return dataRent.length ? (
    <Paper elevation={3}>
      <Box padding={3} display="flex" flexDirection="row" alignItems="center">
        <Typography
          variant="h2"
          fontFamily={"Montserrat"}
          textAlign="center"
          gutterBottom
          component="div"
        >
          Fine and Payment Statistics
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <FormControl>
          {/* <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          component="div"
        >
          Rent and Return Statistics
        </Typography> */}
          <Typography variant="body1" gutterBottom>
            Select Year
          </Typography>
          <Select
            id="demo-simple-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LineChart
          width={700}
          height={500}
          series={[
            { data: dataRent, label: "Fine Count" },
            { data: dataReturn, label: "Payment Count" },
          ]}
          xAxis={[{ scaleType: "point", data: months }]}
        />
      </Box>
    </Paper>
  ) : (
    <div>loading</div>
  );
};

export default FineStat;
