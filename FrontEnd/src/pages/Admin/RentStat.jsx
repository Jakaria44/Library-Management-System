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
const RentStat = () => {
  const [year, setYear] = useState("2023");
  const [options, setOptions] = useState([]);
  const [dataRent, setDataRent] = useState(null); //[{year:2021, data:null}
  const [dataReturn, setDataReturn] = useState(null); //[{year:2021, data:null
  const [res, setRes] = useState([
    {
      year: null,
      data: [],
    },
  ]);
  useEffect(() => {
    // alert(year);
    load();
  }, []);
  useEffect(() => {
    extractData(year);
  }, [year]);

  useEffect(() => {
    // Ensure data is loaded before extracting
    if (res.length > 0) {
      extractData(year);
    }
  }, [res, year]);
  const extractData = (y) => {
    const a = res
      .find((item) => item.year == y)
      ?.data?.map((mon) => ({
        month: parseInt(mon.MONTH),
        rentCount: mon.RENT_COUNT,
        returnCount: mon.RETURN_COUNT,
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
      const res = await server.get("/rent-data");
      const a = res.data?.map((item) => {
        return {
          year: item.YEAR,
          data: JSON.parse(item.DATA),
        };
      });
      console.log(a);

      setOptions(a?.map((item) => item.year));
      // console.log(a);
      setRes(a);
      setYear(a[1]?.year || "2023");
    } catch (e) {
      console.log(e);
      setRes([]);
    }
  };
  if (dataRent === null || dataReturn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={3}>
      <Box padding={3} display="flex" flexDirection="row" alignItems="center">
        <Typography
          variant="h2"
          fontFamily={"Montserrat"}
          textAlign="center"
          gutterBottom
          component="div"
        >
          Rent and Return Statistics
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box sx={{ marginLeft: 10 }}>
          <FormControl sx={{ marginBottom: 10 }}>
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
          <Typography variant="h3" gutterBottom>
            Rent Count
          </Typography>
          <Typography variant="body2" maxWidth={400} gutterBottom>
            This graph shows the monthly number of books successfully borrowed
            by the user throughout the year
          </Typography>
          <Typography variant="h3" gutterBottom>
            Return Count
          </Typography>
          <Typography variant="body2" maxWidth={400} gutterBottom>
            This graph displays the monthly number of books returned by users,
            both before and after the expected due date
          </Typography>
        </Box>
        <LineChart
          width={700}
          height={500}
          series={[
            { data: dataRent, label: "Rent Count" },
            { data: dataReturn, label: "Return Count" },
          ]}
          xAxis={[{ scaleType: "point", data: months }]}
        />
      </Box>
    </Paper>
  );
};

export default RentStat;
