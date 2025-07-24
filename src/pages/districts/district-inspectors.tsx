import { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { AuthRoleEnum } from '../../common/types/auth-role.type';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { Label } from '../../components/ui/label';
import { DistrictService } from '../../services/district.service';
import type { IInspector } from '@/interfaces/inspector.interface';

interface InspectorResponse {
  data: IInspector[];
  total: number;
  page: number;
  lastPage: number;
}

export default function DistrictInspectors() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialRegion = searchParams.get('region') || '';
  const initialDistrict = searchParams.get('district') || '';
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialLimit = parseInt(searchParams.get('limit') || '10');

  const [regionFilter, setRegionFilter] = useState(initialRegion);
  const [districtFilter, setDistrictFilter] = useState(initialDistrict);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const [inspectorsData, setInspectorsData] = useState<InspectorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInspectors = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await DistrictService.findAllInspectors(
        page,
        limit,
        regionFilter,
        districtFilter,
      );
      console.log(data);
      
      setInspectorsData(data);
    } catch (error) {
      console.error("Failed to fetch inspectors:", error);
      setInspectorsData(null);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, regionFilter, districtFilter]);

  useEffect(() => {
    fetchInspectors();
  }, [fetchInspectors]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (regionFilter) newSearchParams.set('region', regionFilter);
    if (districtFilter) newSearchParams.set('district', districtFilter);
    newSearchParams.set('page', String(page));
    newSearchParams.set('limit', String(limit));
    setSearchParams(newSearchParams);
  }, [page, limit, regionFilter, districtFilter, setSearchParams]);

  const handleFilter = () => {
    setPage(1); // Reset to first page on filter change
    // fetchInspectors will be called by useEffect due to page change
  };

  const handleClearFilter = () => {
    setRegionFilter('');
    setDistrictFilter('');
    setPage(1);
    // fetchInspectors will be called by useEffect due to state changes
  };

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="container mx-auto px-12">
      <h1 className="text-3xl font-bold mb-6">Tuman Inspektorlari</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="regionFilter">Viloyat</Label>
          <Input
            id="regionFilter"
            placeholder="Viloyat ID bo'yicha filtrlash"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="districtFilter">Tuman</Label>
          <Input
            id="districtFilter"
            placeholder="Tuman ID bo'yicha filtrlash"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={handleFilter}>Filtrlash</Button>
          <Button variant="outline" onClick={handleClearFilter}>
            Filtrni tozalash
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To'liq Ism</TableHead>
              <TableHead>Telefon Raqami</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Viloyat</TableHead>
              <TableHead>Tuman</TableHead>
              <TableHead>Mahalla</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inspectorsData?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Inspektorlar topilmadi.
                </TableCell>
              </TableRow>
            ) : (
              inspectorsData?.data.map((inspector) => (
                <TableRow key={inspector._id}>
                  <TableCell>{inspector.full_name}</TableCell>
                  <TableCell>{inspector.auth.role}</TableCell>
                  <TableCell>
                    {Object.keys(AuthRoleEnum).find(
                      (key) =>
                        AuthRoleEnum[key as keyof typeof AuthRoleEnum] ===
                        inspector.auth.role,
                    ) || inspector.auth.role}
                  </TableCell>
                  <TableCell>
                    <Link to={`/inspectors/${inspector._id}`}>Batafsil</Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {inspectorsData && inspectorsData.lastPage > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                isActive={page > 1}
              />
            </PaginationItem>
            {[...Array(inspectorsData.lastPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setPage(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1, inspectorsData.lastPage))}
                isActive={page < inspectorsData.lastPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}