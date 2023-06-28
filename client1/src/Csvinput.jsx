import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import Chart from "./Chart";

const CSVInputComponent = () => {
    const [csvData, setCSVData] = useState([]);
    const [jsonSent, setJsonSent] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [visualizeClicked, setVisualizeClicked] = useState(false);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                console.log("got data", e);
                const csv = e.target.result;
                const parsedData = await Papa.parse(csv, { header: true });

                setCSVData(parsedData.data);
                setJsonSent(false);
                setVisualizeClicked(false);
            } catch (error) {
                console.log("csv is irritating", error);
            }
        };

        reader.readAsText(file);
        setFileSelected(true);
    };

    const sendCSVDataAsJSON = async () => {
        try {
            const response = await axios.post("/getdata", {
                data: JSON.stringify(csvData),
            });

            if (response.status === 200) {
                console.log("CSV data sent as JSON to the API.");
                setJsonSent(true);
                setVisualizeClicked(true);
            }
        } catch (error) {
            console.error("Failed to send CSV data as JSON to the API:", error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen p-8 text-white">
            {visualizeClicked ? (
                <Chart />
            ) : (
                <>
                    {!jsonSent && (
                        <div className="mb-4">
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ${
                                    fileSelected
                                        ? ""
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                                onClick={sendCSVDataAsJSON}
                                disabled={!fileSelected}
                            >
                                Visualise
                            </button>
                        </div>
                    )}

                    {jsonSent && (
                        <p className="text-green-500 mt-4">Data Updated</p>
                    )}

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileInputChange}
                        className="text-white mb-4"
                    />

                    {csvData.length > 0 && (
                        <div>
                            <table className="table-auto bg-gray-800 text-white mb-8">
                                <thead>
                                    <tr>
                                        {Object.keys(csvData[0]).map(
                                            (header, index) => (
                                                <th
                                                    key={index}
                                                    className="px-4 py-2"
                                                >
                                                    {header}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Object.values(row).map(
                                                (value, index) => (
                                                    <td
                                                        key={index}
                                                        className="border px-4 py-2"
                                                    >
                                                        {value}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CSVInputComponent;
