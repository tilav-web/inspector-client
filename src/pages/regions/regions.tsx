import {
  regions as allRegions,
  MOCK_INSPECTORS as allInspectors,
} from "@/const/mock.data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  ChevronDown,
  X,
  Flag,
  Briefcase,
  ScanFace,
  Table,
} from "lucide-react";
import type { IRegion } from "@/interfaces/region.interface";
import type { IInspector } from "@/interfaces/inspector.interface";
import { useEffect, useMemo, useState } from "react";

interface InspectorOption {
  value: string;
  label: string;
  inspector: IInspector;
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<IRegion[]>(() =>
    allRegions.map((region) => ({
      ...region,
      id: region.id.toString(),
      inspector: allInspectors.find((i) => i.region === region.name) || null,
    }))
  );

  const [openInspectors, setOpenInspectors] = useState<{
    [key: string]: boolean;
  }>({});

  const [tableView, setTableView] = useState(false);

  const availableInspectors = useMemo(() => {
    const assignedInspectorIds = new Set(
      regions.filter((r) => r.inspector).map((r) => r.inspector!.id)
    );

    return allInspectors
      .filter((inspector) => !assignedInspectorIds.has(inspector.id))
      .map(
        (inspector): InspectorOption => ({
          value: inspector.id,
          label: `${inspector.last_name} ${inspector.first_name} ${inspector.middle_name}`,
          inspector,
        })
      );
  }, [regions]);

  const assignInspector = (regionId: string, inspectorId: string) => {
    const inspector = allInspectors.find((i) => i.id === inspectorId);
    if (inspector) {
      setRegions((prevRegions) =>
        prevRegions.map((reg) =>
          reg.id === regionId ? { ...reg, inspector } : reg
        )
      );
    }
  };

  const removeInspector = (regionId: string) => {
    setRegions((prevRegions) =>
      prevRegions.map((reg) =>
        reg.id === regionId ? { ...reg, inspector: null } : reg
      )
    );
  };

  const toggleInspectorDetails = (regionId: string) => {
    setOpenInspectors((prev) => ({
      ...prev,
      [regionId]: !prev[regionId],
    }));
  };

  const InspectorCombobox = ({
    regionId,
    currentInspector,
  }: {
    regionId: string;
    currentInspector: IInspector | null;
  }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    console.log(value);

    useEffect(() => {
      if (currentInspector) {
        setValue(
          `${currentInspector.last_name} ${currentInspector.first_name} ${currentInspector.middle_name}`
        );
      } else {
        setValue("");
      }
    }, [currentInspector]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={`w-full justify-between ${
              !currentInspector ? "text-muted-foreground" : ""
            }`}
          >
            {currentInspector ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={currentInspector.photo}
                    alt={currentInspector.first_name}
                  />
                  <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {currentInspector.first_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {currentInspector.last_name} {currentInspector.first_name}{" "}
                  {currentInspector.middle_name}
                </span>
              </div>
            ) : (
              <span>Inspektor tanlang...</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 max-h-[300px] overflow-y-auto">
          <Command>
            <CommandInput placeholder="Inspektor qidirish..." />
            <CommandEmpty>Hech narsa topilmadi.</CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {availableInspectors.map((inspectorOption) => (
                <CommandItem
                  key={inspectorOption.value}
                  value={inspectorOption.value}
                  onSelect={() => {
                    assignInspector(regionId, inspectorOption.value);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 mr-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={inspectorOption.inspector.photo}
                        alt={inspectorOption.inspector.first_name}
                      />
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {inspectorOption.inspector.first_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {inspectorOption.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {inspectorOption.inspector.region} -{" "}
                        {inspectorOption.inspector.rank}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  const InspectorDetailsCard = ({ inspector }: { inspector: IInspector }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card className="w-full border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={inspector.photo} alt={inspector.first_name} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {inspector.first_name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-xl leading-tight">
                  {`${inspector.last_name} ${inspector.first_name} ${inspector.middle_name}`}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="text-sm bg-blue-100 text-blue-800"
                >
                  {inspector.rank}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive/80"
              onClick={() => removeInspector(inspector.region)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent
          className={`pt-4 space-y-4 transition-all duration-300 ${
            isExpanded ? "max-h-[800px]" : "max-h-[400px] overflow-hidden"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Telefon</p>
                  <p className="text-base font-semibold">{inspector.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tug'ilgan sana
                  </p>
                  <p className="text-base font-semibold">
                    {inspector.birthday}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Manzil</p>
                  <p className="text-base font-semibold">
                    {`${inspector.region}, ${inspector.district}, ${inspector.neighborhood}`}
                  </p>
                </div>
              </div>

              {isExpanded && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Flag className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Millat</p>
                    <p className="text-base font-semibold">
                      {inspector.nationality}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <ScanFace className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">PINFL</p>
                  <p className="text-base font-semibold">{inspector.pinfl}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="h-4 w-4 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pasport</p>
                  <p className="text-base font-semibold">
                    {`${inspector.passport_series}${inspector.passport_number}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User className="h-4 w-4 text-pink-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Jins</p>
                  <p className="text-base font-semibold">
                    {inspector.gender === "male" ? "Erkak" : "Ayol"}
                  </p>
                </div>
              </div>

              {isExpanded && (
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Briefcase className="h-4 w-4 text-teal-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Ish joylari
                    </p>
                    {inspector.workplaces.length > 0 ? (
                      <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside">
                        {inspector.workplaces.map((wp) => (
                          <li key={wp.id}>
                            {wp.position} - {wp.region}, {wp.district} (
                            {wp.status ? "Faol" : "Faol emas"})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700">
                        Ish joyi ma'lumotlari yo'q
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown
                className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
              {isExpanded ? "Qisqartirish" : "Batafsil ma'lumotlar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const RegionsTableView = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Viloyat
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Inspektor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Telefon
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Darajasi
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Harakatlar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {regions.map((region) => (
              <tr key={region.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">
                      {region.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {region.inspector ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={region.inspector.photo}
                          alt={region.inspector.first_name}
                        />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-green-500 to-teal-600 text-white">
                          {region.inspector.first_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {region.inspector.last_name}{" "}
                          {region.inspector.first_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {region.inspector.middle_name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      Inspektor yo'q
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {region.inspector ? (
                    <span className="text-gray-900">
                      {region.inspector.phone}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {region.inspector ? (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {region.inspector.rank}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <InspectorCombobox
                      regionId={region.id}
                      currentInspector={region.inspector}
                    />
                    {region.inspector && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => removeInspector(region.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Viloyatlar Boshqaruvi
              </h1>
              <p className="text-xl text-gray-600">
                Har bir viloyat uchun inspektorlarni boshqaring va nazorat
                qiling
              </p>
            </div>
            <Button
              variant={tableView ? "default" : "outline"}
              onClick={() => setTableView(!tableView)}
              className="flex items-center gap-2"
            >
              <Table className="h-4 w-4" />
              {tableView ? "Jadval ko'rinishi" : "Ro'yxat ko'rinishi"}
            </Button>
          </div>
        </div>

        {tableView ? (
          <RegionsTableView />
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-6">
            {regions.map((region) => (
              <AccordionItem
                key={region.id}
                defaultValue={region.id}
                value={region.id}
                className="border-0 shadow-lg rounded-xl overflow-hidden bg-white"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:bg-blue-50/50 transition-colors items-center">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {region.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {region.inspector
                            ? "Inspektor biriktirilgan"
                            : "Inspektor biriktirilmagan"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      {region.inspector ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={region.inspector.photo}
                              alt={region.inspector.first_name}
                            />
                            <AvatarFallback className="text-sm bg-gradient-to-br from-green-500 to-teal-600 text-white">
                              {region.inspector.first_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              {region.inspector.last_name}{" "}
                              {region.inspector.first_name}
                            </p>
                            <p className="text-xs text-green-600">
                              Faol inspektor
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">
                          <p className="text-sm">Inspektor yo'q</p>
                          <p className="text-xs">Biriktirish kerak</p>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="py-6">
                  <div className="px-6 pb-6 space-y-6">
                    {!region.inspector ? (
                      <Card className="border-2 border-dashed border-gray-300">
                        <CardContent className="p-8 text-center">
                          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Inspektor biriktirilmagan
                          </h3>
                          <p className="text-gray-500 mb-6">
                            Ushbu viloyat uchun mas'ul inspektor tanlang va
                            biriktiring.
                          </p>
                          <InspectorCombobox
                            regionId={region.id}
                            currentInspector={null}
                          />
                        </CardContent>
                      </Card>
                    ) : (
                      <>
                        <InspectorDetailsCard inspector={region.inspector} />
                        <div className="flex gap-3 pt-4">
                          <div className="flex-1">
                            <InspectorCombobox
                              regionId={region.id}
                              currentInspector={region.inspector}
                            />
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => toggleInspectorDetails(region.id)}
                            className={`max-w-40 w-full ${
                              openInspectors[region.id]
                                ? "bg-red-50 border-red-200 text-red-700"
                                : "bg-blue-50 border-blue-200 text-blue-700"
                            }`}
                          >
                            {openInspectors[region.id] ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Qisqartirish
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-2" />
                                Kengaytirish
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
