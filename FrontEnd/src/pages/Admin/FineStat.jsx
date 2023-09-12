import { Box, FormControl, MenuItem, Paper, Select, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
            <Box paddingTop={3} paddingLeft={3} display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h2" fontFamily="Segoe UI Symbol" textAlign="center" component="div">
                    Fine and Payment Statistics
                </Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Box sx={{ marginLeft: 10 }}>
                    <FormControl sx={{ marginBottom: 5 }}>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Box m="auto">
                                <Typography variant="body1" gutterBottom>
                                    Select Year
                                </Typography>
                            </Box>
                            <Box sx={{ marginLeft: 2 }}>
                                <Select
                                    fullWidth
                                    id="demo-simple-select"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    variant="standard"
                                >
                                    {options.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </FormControl>
                    <Typography variant="h3" gutterBottom>
                        Fine Count
                    </Typography>
                    <Typography textAlign="justify" variant="body2" maxWidth={400} gutterBottom>
                        This graph tracks the number of cases where readers have not returned their books on time and
                        have been added to the fine list.
                    </Typography>
                    <Typography variant="h3" mt={2} gutterBottom>
                        Paid Count
                    </Typography>
                    <Typography textAlign="justify" variant="body2" maxWidth={400} gutterBottom>
                        This graph tracks the number of cases in which readers, who were added to the fine list,
                        returned their books with the assigned fine
                    </Typography>
                </Box>

                <LineChart
                    width={700}
                    height={380}
                    series={[
                        { data: dataRent, label: "Fine Count" },
                        { data: dataReturn, label: "Paid Count" },
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
