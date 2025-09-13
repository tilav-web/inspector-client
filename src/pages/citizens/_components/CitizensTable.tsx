import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, User, Phone, MapPin } from "lucide-react";
import type { ICitizen } from "@/interfaces/citizen.interface";

interface CitizensTableProps {
  citizens: ICitizen[];
  onCitizenClick: (citizen: ICitizen) => void;
  onViewProfile: (citizenId: string) => void;
  onEdit: (citizenId: string) => void;
}

export const CitizensTable = ({
  citizens,
  onCitizenClick,
  onViewProfile,
  onEdit,
}: CitizensTableProps) => {
  return (
    <div className="rounded-lg border border-blue-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <TableRow className="border-blue-200">
            <TableHead className="text-blue-900 font-semibold">
              Ism Familiya
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">
              Pasport
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">Hudud</TableHead>
            <TableHead className="text-blue-900 font-semibold">Telefon</TableHead>
            <TableHead className="text-blue-900 font-semibold">Jinsi</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">
              Amallar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citizens.length > 0 ? (
            citizens.map((citizen) => (
              <TableRow
                key={citizen.id}
                className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-200 border-blue-100"
                onClick={() => onCitizenClick(citizen)}
              >
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                      <img
                        src={citizen.photo}
                        alt={`${citizen.first_name} ${citizen.last_name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{`${citizen.first_name} ${citizen.last_name}`}</div>
                      <div className="text-sm text-gray-500">
                        {citizen.middle_name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {citizen.passport_series} {citizen.passport_number}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    {`${citizen.region}, ${citizen.district}`}
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-blue-500" />
                    {citizen.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      citizen.gender === "male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {citizen.gender === "male" ? "Erkak" : "Ayol"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewProfile(citizen.id);
                    }}
                  >
                    Ko'rish
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(citizen.id);
                    }}
                  >
                    Tahrirlash
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                  <User className="h-12 w-12 text-gray-300" />
                  <p className="text-lg font-medium">
                    Hech qanday fuqaro topilmadi
                  </p>
                  <p className="text-sm">
                    Filterlarni o'zgartirib qayta urinib ko'ring
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}: PaginationProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-50/50 border-t border-blue-100">
      <div className="text-sm text-blue-700">
        {totalCount} ta fuqaro topildi
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-blue-100"
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </PaginationPrevious>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => onPageChange(index + 1)}
                isActive={currentPage === index + 1}
                className={
                  currentPage === index + 1
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-blue-100"
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-blue-100"
            }
          >
            <ArrowRight className="h-4 w-4" />
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
