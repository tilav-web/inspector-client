import { useEffect, useState } from "react";
import { regionService } from "@/services/region.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface IRegionInspector {
  _id: string;
  full_name: string;
  short_name: string;
  region: {
    _id: string;
    full_name: string;
    short_name: string;
  };
  inspectors: number;
}

export default function RegionsInspectorsCount() {
  const [data, setData] = useState<IRegionInspector[]>([]);
  const [search, setSearch] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 500); // 500ms debounce
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await regionService.getDistrictsWithInspectorCounts(search);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [search]);

  return (
    <div className="px-12 pb-12">
      <div>
        <h1 className="text-xl md:text-5xl font-extrabold text-center text-gray-800 tracking-tight mb-6">
          Tumanlardagi profilaktika inspectorlari soni
        </h1>
      </div>
      <div className="p-4 my-4 shadow rounded">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Tuman nomi bilan qidiring!"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="shadow p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tuman</TableHead>
              <TableHead className="text-right">Inspektorlar soni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow className="cursor-pointer" key={item._id}>
                <TableCell>
                  <Link to={"/"}>{item.full_name}</Link>
                </TableCell>
                <TableCell className="text-right">{item.inspectors}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
