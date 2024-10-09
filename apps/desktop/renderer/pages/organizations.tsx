import React, { useMemo, useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
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
const DATE_OPTIONS = ['14 Feb 2019', '15 Feb 2019', '16 Feb 2019'];

const mockOrganizations = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  image: "/api/placeholder/40/40",
  ss: `Organization ${index + 1}`,
  cms: `CMS-${index + 1}`,
  address: `Address ${index + 1}`,
  email: `org${index + 1}@example.com`,
  responsibleName: `Manager ${index + 1}`,
  trainingManagerName: `Trainer ${index + 1}`
}));

const OrganizationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0]);

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => {
    return mockOrganizations.filter(org => 
      Object.values(org).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  // Memoized paginated data
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">Organizations</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for organization..."
            className="pl-10 text-gray-600 placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2 text-gray-600">
            <Filter className="h-4 w-4" />
            Filter By
          </Button>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px] text-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_OPTIONS.map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleReset}
          >
            Reset Filter
          </Button>

          <Button className="btn-blue text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-600">Image</TableHead>
                <TableHead className="text-gray-600">S.S</TableHead>
                <TableHead className="text-gray-600">CMS</TableHead>
                <TableHead className="text-gray-600">Address</TableHead>
                <TableHead className="text-gray-600">Email</TableHead>
                <TableHead className="text-gray-600">Responsible Name</TableHead>
                <TableHead className="text-gray-600">Training Manager Name</TableHead>
                <TableHead className="text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((org) => (
                <TableRow key={org.id} className="hover:bg-gray-50">
                  <TableCell>
                    <img
                      // src={org.image}
                      src='/images/profile_img.png'
                      alt="Organization"
                      className="w-8 h-8 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-gray-600">{org.ss}</TableCell>
                  <TableCell className="text-gray-600">{org.cms}</TableCell>
                  <TableCell className="text-gray-600">{org.address}</TableCell>
                  <TableCell className="text-gray-600">{org.email}</TableCell>
                  <TableCell className="text-gray-600">{org.responsibleName}</TableCell>
                  <TableCell className="text-gray-600">{org.trainingManagerName}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;