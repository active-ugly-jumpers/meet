import React, { useState, useEffect } from "react";
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const EventGenresChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (events.length > 0) {
            const getData = () => {
                const data = events.reduce((acc, event) => {
                    const city = event.location.split((/, | - /)).shift();
                    const existingCity = acc.find((item) => item.city === city);
                    if (existingCity) {
                        existingCity.countnumber++;
                    } else {
                        acc.push({ city, countnumber: 1 });
                    }
                    return acc;
                }, []);
                return data;
            };
            setData(getData());
        }
    }, [events]);

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20, right: 20, bottom: 60, left: -30,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="category" dataKey="city" name="City"
                    angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
                />
                <YAxis type="number" dataKey="countnumber" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;