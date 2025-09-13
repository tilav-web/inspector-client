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
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import type { IInspector } from "@/interfaces/inspector.interface";

interface InspectorsTableProps {
  inspectors: IInspector[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onInspectorClick: (inspector: IInspector) => void;
  onViewProfile: (inspectorId: string) => void;
}

export const InspectorsTable = ({
  inspectors,
  onInspectorClick,
  onViewProfile,
}: InspectorsTableProps) => {
  return (
    <div className="rounded-lg border border-blue-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <TableRow className="border-blue-200">
            <TableHead className="text-blue-900 font-semibold">
              Ism Familiya
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">Unvon</TableHead>
            <TableHead className="text-blue-900 font-semibold">Hudud</TableHead>
            <TableHead className="text-blue-900 font-semibold">Telefon</TableHead>
            <TableHead className="text-blue-900 font-semibold">Jinsi</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">
              Amallar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspectors.length > 0 ? (
            inspectors.map((inspector) => (
              <TableRow
                key={inspector.id}
                className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-200 border-blue-100"
                onClick={() => onInspectorClick(inspector)}
              >
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-18 h-22 overflow-hidden border-2 border-blue-200">
                      <img
                        src={inspector.photo}
                        alt={`${inspector.first_name} ${inspector.last_name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-blue-100 flex items-center justify-center"><svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></div>';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{`${inspector.first_name} ${inspector.last_name}`}</div>
                      <div className="text-sm text-gray-500">{inspector.middle_name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {inspector.rank}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    {`${inspector.region}, ${inspector.district}`}
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-blue-500" />
                    {inspector.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      inspector.gender === "male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {inspector.gender === "male" ? "Erkak" : "Ayol"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewProfile(inspector.id);
                    }}
                  >
                    Ko'rish
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
                    Hech qanday inspektor topilmadi
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
        {totalCount} ta inspektor topildi
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
