"use client";
import React, { useMemo, useState } from "react";
import { Search, Download, Edit2, Trash2 } from "lucide-react";
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
import { useTranslation } from "react-i18next";
import { usePermissions } from "../contexts/PermissionsContext";
import { useRouter } from "next/router";
import withAuth from "../hoc/with-auth";

const ITEMS_PER_PAGE = 10;
const DATE_OPTIONS = [
  "All",
  ...Array.from({ length: 50 }, (_, index) => `${2020 + index}`),
];
type FilterObject = {
  searchQuery?: string;
  selectedDate?: string;
};

const applyFilters = (organizations, filters: FilterObject) => {
  return organizations.filter((org) => {
    const matchesSearchQuery = filters.searchQuery
      ? Object.values(org).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      )
      : true;
    const matchesSelectedDate = filters.selectedDate
      ? filters.selectedDate === "All" ||
      org.date.includes(filters.selectedDate)
      : true;
    return matchesSearchQuery && matchesSelectedDate;
  });
};

const mockOrganizations = Array.from({ length: 50 }, (_, index) => {
  const year = 2020 + Math.floor(index / 12);
  const month = (index % 12) + 1;
  const formattedMonth = month.toString().padStart(2, "0");
  return {
    id: index + 1,
    image: "/api/placeholder/40/40",
    rs: `Organization ${index + 1}`,
    cnss: `CNSS-${index + 1}`,
    address: `Address ${index + 1}`,
    email: `org${index + 1}@example.com`,
    responsibleName: `Manager ${index + 1}`,
    trainingManagerName: `Trainer ${index + 1}`,
    date: `**/${formattedMonth}/${year}`,
  };
});

const OrganizationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(DATE_OPTIONS[0]);
  const permissions = usePermissions();
  const router = useRouter();

  // Load language translations
  const { t } = useTranslation();

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => {
    const filters: FilterObject = {
      searchQuery,
      selectedDate,
    };
    return applyFilters(mockOrganizations, filters);
  }, [searchQuery, selectedDate]);

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

  const handleEditClick = (organization) => {
    router.push({
      pathname: "/registration",
      query: { organization: JSON.stringify(organization) },
    });
  };

  if (
    !permissions?.organizations.canView &&
    !permissions?.organizations.canModify
  ) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          {t("organization.organizations")}
        </h1>
        <div className="text-red-500">{t("noPermission")}</div>
      </div>
    );
  }
  const token = localStorage.getItem('token');

  console.log(`token is: ${token}`)

  return (
    <div className="h-full w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          {t("organization.organizations")}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("organization.searchPlaceholder")}
            className="pl-10 text-gray-600 placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[140px] text-gray-600">
              <SelectValue placeholder={t("organization.dateSelect")} />
            </SelectTrigger>
            <SelectContent className="bg-gray-600">
              {DATE_OPTIONS.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {permissions?.organizations.canModify && (
            <Button className="btn-blue text-white">
              <Download className="h-4 w-4 mr-2" />
              {t("organization.export")}
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-600">
                  {t("organization.image")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.rs")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.cnss")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.address")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.email")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.responsibleName")}
                </TableHead>
                <TableHead className="text-gray-600">
                  {t("organization.trainingManagerName")}
                </TableHead>
                <TableHead className="text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((org) => (
                <TableRow key={org.id} className="hover:bg-gray-50">
                  <TableCell className="items-center">
                    <img
                      src="/images/profile_img.png"
                      alt="Organization"
                      className="w-8 h-8 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-gray-600">{org.rs}</TableCell>
                  <TableCell className="text-gray-600">{org.cnss}</TableCell>
                  <TableCell className="text-gray-600">{org.address}</TableCell>
                  <TableCell className="text-gray-600">{org.email}</TableCell>
                  <TableCell className="text-gray-600">
                    {org.responsibleName}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {org.trainingManagerName}
                  </TableCell>
                  <TableCell>
                    {permissions?.organizations.canModify && (
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            handleEditClick(org);
                          }}
                          className="bg-blue-100 text-blue-800 rounded-l-full"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => ()}
                          className="bg-red-100 text-red-800 rounded-r-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          {t("organization.page")} {currentPage} {t("organization.of")}{" "}
          {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-600"
          >
            {t("organization.previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-600"
          >
            {t("organization.next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(OrganizationsPage);
