import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { IoIosAddCircleOutline } from "react-icons/io";

const monthAbbreviations = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const mockThemes = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12);
  const month = (index % 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return {
    id: index + 1,
    year: year,
    theme: `Theme ${index + 1}`,
    group: `Group ${index + 1}`,
    action: `Action ${index + 1}`,
    date: `${monthAbbreviations[month]}-${day}`,
    trainer: `Trainer ${index + 1}`,
    operator: `Operator ${index + 1}`,
    location: `Location ${index + 1}`,
    costPerDay: (Math.random() * 1000).toFixed(2),
    nbrParticipant: Math.floor(Math.random() * 100) + 1,
  };
});

const ITEMS_PER_PAGE = 10;

const themes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  const paginatedThemes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return mockThemes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage]);

  const totalPages = Math.ceil(mockThemes.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
  };

  return (
    <div className=" space-y-6 w-full h-full min-h-screen mx-auto">
      <Card className="p-6 mb-6">
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <p className="text-lg  text-gray-950 font-bold mb-6">Theme</p>
            <Button
              className="border border-blue-600 text-blue-600"
              type="submit"
            >
              Import
            </Button>
            <Button className="btn-blue" type="submit">
              Export
            </Button>
            <Button
              className="border border-blue-600 text-blue-600 text-lg"
              type="submit"
            >
              <IoIosAddCircleOutline />
              Add Manual
            </Button>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-600">Fiscal Year</TableHead>
                    <TableHead className="text-gray-600">Theme</TableHead>
                    <TableHead className="text-gray-600">Group</TableHead>
                    <TableHead className="text-gray-600">Action</TableHead>
                    <TableHead className="text-gray-600">Date</TableHead>
                    <TableHead className="text-gray-600">Trainer</TableHead>
                    <TableHead className="text-gray-600">Operator</TableHead>
                    <TableHead className="text-gray-600">Location</TableHead>
                    <TableHead className="text-gray-600">Cost/day</TableHead>
                    <TableHead className="text-gray-600">
                      Nbr participant
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedThemes.map((theme, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-600">
                        {theme.year}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.theme}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.group}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.action}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.date}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.trainer}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.operator}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.location}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.costPerDay}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {theme.nbrParticipant}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-600"
            >
              previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-600"
            >
              next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default themes;
