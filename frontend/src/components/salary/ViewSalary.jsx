import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setSalaries(response.data.salaries);
          setFilteredSalaries(response.data.salaries);
        }
        // console.log(response.data);
      } catch (error) {
        alert(error?.response?.data?.message || "Error fetching salary data");
      }
    };
    fetchSalaries();
  });

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((salary) =>
      new Date(salary.payDate)
        .toLocaleDateString()
        .toLowerCase()
        .includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-2xl text-center text-teal-600 font-bold">
        Salary History
      </h2>

      <div className="flex justify-end my-3">
        <input
          type="text"
          placeholder="Search by staff ID or date"
          className="border-2 border-teal-600 rounded px-4 py-2"
          onChange={(e) => filterSalaries(e.target.value)}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 border">
            <tr>
              <th className="px-4 py-2">SNO</th>
              <th className="px-4 py-2">StaffID</th>
              <th className="px-4 py-2">Basic</th>
              <th className="px-4 py-2">Allowance</th>
              <th className="px-4 py-2">Deduction</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary, index) => (
              <tr key={salary._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{salary.staffId?.staffId}</td>
                {/* <td className="px-4 py-2">{salary.staffId?.name}</td> */}
                <td className="px-4 py-2">{salary.basicSalary}</td>
                <td className="px-4 py-2">{salary.allowances}</td>
                <td className="px-4 py-2">{salary.deductions}</td>
                <td className="px-4 py-2">{salary.netSalary}</td>
                <td className="px-4 py-2">
                  {new Date(salary.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-5 text-gray-500">
          No salary records found
        </p>
      )}
    </div>
  );
};

export default ViewSalary;
