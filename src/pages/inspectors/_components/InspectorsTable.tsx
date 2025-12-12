import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

// Mock ma'lumotlar - serverdan keladigan ma'lumotlar strukturasi
interface IInspector {
  _id: string;
  auth: {
    _id: string;
    username: string;
    role: string;
  };
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  rank: string;
  address: {
    region: {
      _id: string;
      name: string;
    };
    district: {
      _id: string;
      region: string;
      name: string;
    };
    neighborhood: {
      _id: string;
      region: string;
      district: string;
      name: string;
    };
    detail: string;
  };
  pinfl: number;
  passport_number: number;
  passport_series: string;
  gender: string;
  phone: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  workplaces: Array<{
    _id: string;
    inspector: string;
    position: string;
    region: string;
    district: string;
    neighborhood: string;
    note: string;
    status: boolean;
    __v: number;
  }>;
}

// Mock ma'lumotlar
const mockInspectors: IInspector[] = [
  {
    _id: "68cd29ebe25477031d74c802",
    auth: {
      _id: "68cd29ebe25477031d74c800",
      username: "shavqiddin_tilovov",
      role: "state",
    },
    first_name: "Shavqiddin",
    last_name: "Tilovov",
    middle_name: "Sobirjon o‘g‘li",
    birthday: "1998-07-21",
    rank: "MFY Inspectori",
    address: {
      region: {
        _id: "68cd1ee48c278f85face5f4e",
        name: "Qashqadaryo viloyati",
      },
      district: {
        _id: "68cd1f938c278f85face5f55",
        region: "68cd1ee48c278f85face5f4e",
        name: "Muborak tumani",
      },
      neighborhood: {
        _id: "68cd20c08c278f85face5f56",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        name: "Tong MFY",
      },
      detail: "Qashqadaryo viloyati Muborak tumani Tong MFY 32-uy 38-xonadon",
    },
    pinfl: 12345678901234,
    passport_number: 1234567,
    passport_series: "AB",
    gender: "male",
    phone: "+998901234567",
    nationality: "O‘zbek",
    createdAt: "2025-09-19T10:01:15.691Z",
    updatedAt: "2025-09-19T10:01:15.691Z",
    __v: 0,
    workplaces: [
      {
        _id: "68cd29ebe25477031d74c804",
        inspector: "68cd29ebe25477031d74c802",
        position: "General",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        neighborhood: "68cd20c08c278f85face5f56",
        note: "Super admin sifatida",
        status: true,
        __v: 0,
      },
    ],
  },
  {
    _id: "68cd29ebe25477031d74c803",
    auth: {
      _id: "68cd29ebe25477031d74c801",
      username: "dilshod_rahimov",
      role: "district",
    },
    first_name: "Dilshod",
    last_name: "Rahimov",
    middle_name: "Javlonbek o'g'li",
    birthday: "1995-03-15",
    rank: "Tuman Inspectori",
    address: {
      region: {
        _id: "68cd1ee48c278f85face5f4e",
        name: "Qashqadaryo viloyati",
      },
      district: {
        _id: "68cd1f938c278f85face5f55",
        region: "68cd1ee48c278f85face5f4e",
        name: "Muborak tumani",
      },
      neighborhood: {
        _id: "68cd20c08c278f85face5f57",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        name: "Yangiobod MFY",
      },
      detail:
        "Qashqadaryo viloyati Muborak tumani Yangiobod MFY 45-uy 12-xonadon",
    },
    pinfl: 98765432109876,
    passport_number: 7654321,
    passport_series: "AC",
    gender: "male",
    phone: "+998907654321",
    nationality: "O‘zbek",
    createdAt: "2025-09-18T08:30:45.123Z",
    updatedAt: "2025-09-18T08:30:45.123Z",
    __v: 0,
    workplaces: [
      {
        _id: "68cd29ebe25477031d74c805",
        inspector: "68cd29ebe25477031d74c803",
        position: "Inspector",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        neighborhood: "68cd20c08c278f85face5f57",
        note: "Tuman inspectori",
        status: true,
        __v: 0,
      },
    ],
  },
  {
    _id: "68cd29ebe25477031d74c806",
    auth: {
      _id: "68cd29ebe25477031d74c802",
      username: "gulnora_azimova",
      role: "neighborhood",
    },
    first_name: "Gulnora",
    last_name: "Azimova",
    middle_name: "Rustam qizi",
    birthday: "1990-12-05",
    rank: "MFY Yordamchisi",
    address: {
      region: {
        _id: "68cd1ee48c278f85face5f4e",
        name: "Qashqadaryo viloyati",
      },
      district: {
        _id: "68cd1f938c278f85face5f55",
        region: "68cd1ee48c278f85face5f4e",
        name: "Muborak tumani",
      },
      neighborhood: {
        _id: "68cd20c08c278f85face5f56",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        name: "Tong MFY",
      },
      detail: "Qashqadaryo viloyati Muborak tumani Tong MFY 18-uy 5-xonadon",
    },
    pinfl: 45678901234567,
    passport_number: 2345678,
    passport_series: "AD",
    gender: "female",
    phone: "+998902345678",
    nationality: "O‘zbek",
    createdAt: "2025-09-17T14:20:30.456Z",
    updatedAt: "2025-09-17T14:20:30.456Z",
    __v: 0,
    workplaces: [
      {
        _id: "68cd29ebe25477031d74c807",
        inspector: "68cd29ebe25477031d74c806",
        position: "Assistant",
        region: "68cd1ee48c278f85face5f4e",
        district: "68cd1f938c278f85face5f55",
        neighborhood: "68cd20c08c278f85face5f56",
        note: "MFY yordamchisi",
        status: true,
        __v: 0,
      },
    ],
  },
];

export const InspectorsTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockInspectors.length / itemsPerPage);

  // Joriy sahifada ko'rsatiladigan inspektorlar
  const currentInspectors = mockInspectors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewProfile = (inspectorId: string) => {
    navigate(`/inspectors/actions/${inspectorId}`);
  };

  return (
    <div className="rounded-lg border border-blue-100 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <TableRow className="border-blue-200">
            <TableHead className="text-blue-900 font-semibold">
              Ism Familiya
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">Unvon</TableHead>
            <TableHead className="text-blue-900 font-semibold">Hudud</TableHead>
            <TableHead className="text-blue-900 font-semibold">
              Telefon
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">Jinsi</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">
              Amallar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentInspectors.length > 0 ? (
            currentInspectors.map((inspector) => (
              <TableRow
                key={inspector._id}
                className="hover:bg-blue-50/50 transition-colors duration-200 border-blue-100"
              >
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 bg-blue-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{`${inspector.first_name} ${inspector.last_name}`}</div>
                      <div className="text-sm text-gray-500">
                        {inspector.middle_name}
                      </div>
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
                    {`${inspector.address.region.name}, ${inspector.address.district.name}`}
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
                    onClick={() => handleViewProfile(inspector._id)}
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

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 bg-blue-50/50 border-t border-blue-100">
        <div className="text-sm text-blue-700">
          {mockInspectors.length} ta inspektor topildi
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-blue-100 cursor-pointer"
              }
            >
              <ArrowLeft className="h-4 w-4" />
            </PaginationPrevious>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className={
                    currentPage === index + 1
                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                      : "hover:bg-blue-100 cursor-pointer"
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-blue-100 cursor-pointer"
              }
            >
              <ArrowRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
