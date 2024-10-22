import React, { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  FiUpload,
  FiDownload,
  FiSearch,
  FiFilter,
  FiArrowDown,
} from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ITEMS_PER_PAGE = 10;
const DATE_OPTIONS = ["14 Feb 2019", "15 Feb 2019", "16 Feb 2019"];

const mockOrganizations = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  image: "/images/profile_img.png", // Example image path
  ss: `Organization ${index + 1}`,
  cms: `CMS-${index + 1}`,
  address: `Address ${index + 1}`,
  email: `org${index + 1}@example.com`,
  responsibleName: `Manager ${index + 1}`,
  trainingManagerName: `Trainer ${index + 1}`,
}));

const OrganizationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0]);

  const filteredOrganizations = useMemo(() => {
    return mockOrganizations.filter((org) =>
      Object.values(org).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrganizations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrganizations, currentPage]);

  const totalPages = Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setSelectedDate(DATE_OPTIONS[0]);
  };

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Organizations</h1>
        <div className="flex gap-4">
          {" "}
          {/* Increased gap between Import/Export buttons */}
          <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-2 rounded-lg">
            <FiUpload className="h-5 w-5" />
            Import
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg">
            <FiDownload className="h-5 w-5" />
            Export
          </button>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Section: Search Input */}
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            placeholder="Search for organization by email or cnes"
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none w-full"
          />
        </div>

        {/* Right Section: Buttons and Profile */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Buttons Section with Two Rows */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {" "}
              {/* Increased horizontal gap */}
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
                <FiArrowDown className="h-5 w-5" />
                Sort by
              </button>
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
                <FiFilter className="h-5 w-5" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-300 rounded-lg bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-600">Image</TableHead>
              <TableHead className="text-gray-600">S.S</TableHead>
              <TableHead className="text-gray-600">CMS</TableHead>
              <TableHead className="text-gray-600">Address</TableHead>
              <TableHead className="text-gray-600">Email</TableHead>
              <TableHead className="text-gray-600">Responsible Name</TableHead>
              <TableHead className="text-gray-600">
                Training Manager Name
              </TableHead>
              <TableHead className="text-gray-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((org) => (
              <TableRow key={org.id} className="hover:bg-gray-50">
                <TableCell>
                  <img
                    src={org.image}
                    alt={`Organization ${org.id}`}
                    className="w-8 h-8 rounded-full"
                  />
                </TableCell>
                <TableCell className="text-gray-800">{org.ss}</TableCell>
                <TableCell className="text-gray-800">{org.cms}</TableCell>
                <TableCell className="text-gray-800">{org.address}</TableCell>
                <TableCell className="text-gray-800">{org.email}</TableCell>
                <TableCell className="text-gray-800">
                  {org.responsibleName}
                </TableCell>
                <TableCell className="text-gray-800">
                  {org.trainingManagerName}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-4">
        {/* Page Info with Dropdown and Buttons */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>Page</span>

          {/* Dropdown for Page Selection */}
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          <span>of {totalPages}</span>
        </div>

        {/* Back and Next Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`border border-gray-300 px-4 py-2 rounded-md text-gray-700 
      ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Back
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-white bg-gray-800
      ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
