import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inspectorService } from "@/services/inspector.service";
import { useParams } from "react-router-dom";

// Mock data for regions, districts, and neighborhoods
const MOCK_REGIONS = [
  { id: "1", name: "Toshkent shahri" },
  { id: "2", name: "Toshkent viloyati" },
  { id: "3", name: "Samarqand" },
  { id: "4", name: "Buxoro" },
];

const MOCK_DISTRICTS = [
  { id: "1", regionId: "1", name: "Yunusobod" },
  { id: "2", regionId: "1", name: "Mirzo Ulug'bek" },
  { id: "3", regionId: "2", name: "Chirchiq" },
  { id: "4", regionId: "2", name: "Angren" },
];

const MOCK_NEIGHBORHOODS = [
  { id: "1", districtId: "1", name: "Qorasuv MFY" },
  { id: "2", districtId: "1", name: "Bodomzor MFY" },
  { id: "3", districtId: "2", name: "Chig'atoy MFY" },
  { id: "4", districtId: "2", name: "Olmazor MFY" },
];

// Validation schema using Yup
const validationSchema = Yup.object({
  auth_details: Yup.object({
    username: Yup.string().required("Foydalanuvchi nomi kiritilishi shart"),
    password: Yup.string()
      .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak")
      .required("Parol kiritilishi shart"),
    role: Yup.string(),
  }),
  inspector_details: Yup.object({
    first_name: Yup.string().required("Ism kiritilishi shart"),
    last_name: Yup.string().required("Familiya kiritilishi shart"),
    middle_name: Yup.string(),
    birthday: Yup.date().required("Tug'ilgan sana kiritilishi shart"),
    rank: Yup.string().required("Unvon kiritilishi shart"),
    address: Yup.object({
      region: Yup.string().required("Viloyat tanlanishi shart"),
      district: Yup.string().required("Tuman tanlanishi shart"),
      neighborhood: Yup.string().required("MFY tanlanishi shart"),
      detail: Yup.string().required("Manzil tafsilotlari kiritilishi shart"),
    }),
    pinfl: Yup.string()
      .matches(/^\d{14}$/, "PINFL 14 raqamdan iborat bo'lishi kerak")
      .required("PINFL kiritilishi shart"),
    passport_number: Yup.string()
      .matches(/^\d{7}$/, "Passport raqami 7 raqamdan iborat bo'lishi kerak")
      .required("Passport raqami kiritilishi shart"),
    passport_series: Yup.string()
      .matches(
        /^[A-Z]{2}$/,
        "Passport seriyasi 2 harfdan iborat bo'lishi kerak"
      )
      .required("Passport seriyasi kiritilishi shart"),
    gender: Yup.string().required("Jins tanlanishi shart"),
    phone: Yup.string()
      .matches(/^\+998\d{9}$/, "Telefon raqami to'g'ri formatda bo'lishi kerak")
      .required("Telefon raqami kiritilishi shart"),
    nationality: Yup.string().required("Millati kiritilishi shart"),
    workplace: Yup.object({
      position: Yup.string().required("Lavozim kiritilishi shart"),
      region: Yup.string().required("Viloyat tanlanishi shart"),
      district: Yup.string().required("Tuman tanlanishi shart"),
      neighborhood: Yup.string().required("MFY tanlanishi shart"),
      note: Yup.string(),
      status: Yup.boolean().required("Holat tanlanishi shart"),
    }),
  }),
});

export default function ActionsInspector() {
  const [previewImage, setPreviewImage] = useState("");
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      auth_details: {
        username: "",
        password: "",
        role: "neighborhood",
      },
      inspector_details: {
        first_name: "",
        last_name: "",
        middle_name: "",
        birthday: "",
        rank: "",
        address: {
          region: "",
          district: "",
          neighborhood: "",
          detail: "",
        },
        pinfl: "",
        passport_number: "",
        passport_series: "",
        gender: "male",
        phone: "",
        nationality: "",
        workplace: {
          position: "",
          region: "",
          district: "",
          neighborhood: "",
          note: "",
          status: true,
        },
      },
      photo: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission (e.g., API call)
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("photo", null);
    setPreviewImage("");
  };

  const filteredDistricts = MOCK_DISTRICTS.filter(
    (district) =>
      district.regionId === formik.values.inspector_details.address.region
  );

  const filteredNeighborhoods = MOCK_NEIGHBORHOODS.filter(
    (neighborhood) =>
      neighborhood.districtId ===
      formik.values.inspector_details.address.district
  );

  const filteredWorkplaceDistricts = MOCK_DISTRICTS.filter(
    (district) =>
      district.regionId === formik.values.inspector_details.workplace.region
  );

  const filteredWorkplaceNeighborhoods = MOCK_NEIGHBORHOODS.filter(
    (neighborhood) =>
      neighborhood.districtId ===
      formik.values.inspector_details.workplace.district
  );

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const data = await inspectorService.findById(id);
        console.log(data);

        formik.setValues({
          auth_details: {
            username: data?.auth?.username ?? "",
            password: "",
            role: data?.auth?.role ?? "neighborhood",
          },
          inspector_details: {
            first_name: data?.first_name ?? "",
            last_name: data?.last_name ?? "",
            middle_name: data?.middle_name ?? "",
            birthday: data?.birthday ?? "",
            rank: data?.rank ?? "",
            address: {
              region: data?.address?.region?._id ?? "",
              district: data?.address?.district?._id ?? "",
              neighborhood: data?.address?.neighborhood?._id ?? "",
              detail: data?.address?.detail ?? "",
            },
            pinfl: data?.pinfl ?? "",
            passport_number: data?.passport_number ?? "",
            passport_series: data?.passport_series ?? "",
            gender: data?.gender ?? "male",
            phone: data?.phone ?? "",
            nationality: data?.nationality ?? "",
            workplace: {
              position: "",
              region: "",
              district: "",
              neighborhood: "",
              note: "",
              status: true,
            },
          },
          photo: null,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pt-4">
          <CardTitle className="text-2xl text-blue-800">
            Inspektor ma'lumotlari
          </CardTitle>
          <CardDescription className="text-gray-600">
            Yangi inspektor qo'shish uchun quyidagi formani to'ldiring
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-blue-700">
                Rasm yuklash
              </h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="h-32 w-26 object-cover border-2 border-blue-300 shadow"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="h-32 w-26 bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
                      <Upload className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="profile-image"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-blue-500" />
                      <p className="mb-2 text-sm text-blue-600">
                        <span className="font-semibold">Rasm yuklash</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG yoki JPEG (MAX. 5MB)
                      </p>
                    </div>
                    <Input
                      id="profile-image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>
            </div>

            {/* Auth Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-blue-700">
                Autentifikatsiya ma'lumotlari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="auth_details.username"
                    className="text-gray-700"
                  >
                    Foydalanuvchi nomi *
                  </Label>
                  <Input
                    id="auth_details.username"
                    name="auth_details.username"
                    value={formik.values.auth_details.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="javohir_tursunov"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.auth_details?.username &&
                        formik.errors.auth_details?.username &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.auth_details?.username &&
                    formik.errors.auth_details?.username && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.auth_details.username}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="auth_details.password"
                    className="text-gray-700"
                  >
                    Parol *
                  </Label>
                  <Input
                    id="auth_details.password"
                    name="auth_details.password"
                    type="password"
                    value={formik.values.auth_details.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="********"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.auth_details?.password &&
                        formik.errors.auth_details?.password &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.auth_details?.password &&
                    formik.errors.auth_details?.password && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.auth_details.password}
                      </p>
                    )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth_details.role" className="text-gray-700">
                  Rol *
                </Label>
                <Select
                  name="auth_details.role"
                  value={formik.values.auth_details.role}
                  onValueChange={(value) =>
                    formik.setFieldValue("auth_details.role", value)
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.auth_details?.role &&
                        formik.errors.auth_details?.role &&
                        "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Rolni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="state">state</SelectItem>
                    <SelectItem value="region">region</SelectItem>
                    <SelectItem value="district">district</SelectItem>
                    <SelectItem value="neighborhood">neighborhood</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.auth_details?.role &&
                  formik.errors.auth_details?.role && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.auth_details.role}
                    </p>
                  )}
              </div>
            </div>

            {/* Inspector Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-blue-700">
                Shaxsiy ma'lumotlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.first_name"
                    className="text-gray-700"
                  >
                    Ism *
                  </Label>
                  <Input
                    id="inspector_details.first_name"
                    name="inspector_details.first_name"
                    value={formik.values.inspector_details.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Javohir"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.first_name &&
                        formik.errors.inspector_details?.first_name &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.first_name &&
                    formik.errors.inspector_details?.first_name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.first_name}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.last_name"
                    className="text-gray-700"
                  >
                    Familiya *
                  </Label>
                  <Input
                    id="inspector_details.last_name"
                    name="inspector_details.last_name"
                    value={formik.values.inspector_details.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Tursunov"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.last_name &&
                        formik.errors.inspector_details?.last_name &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.last_name &&
                    formik.errors.inspector_details?.last_name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.last_name}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.middle_name"
                    className="text-gray-700"
                  >
                    Otasining ismi
                  </Label>
                  <Input
                    id="inspector_details.middle_name"
                    name="inspector_details.middle_name"
                    value={formik.values.inspector_details.middle_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nemat o'g'li"
                    className="focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.birthday"
                    className="text-gray-700"
                  >
                    Tug'ilgan sana *
                  </Label>
                  <Input
                    id="inspector_details.birthday"
                    name="inspector_details.birthday"
                    type="date"
                    value={formik.values.inspector_details.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.birthday &&
                        formik.errors.inspector_details?.birthday &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.birthday &&
                    formik.errors.inspector_details?.birthday && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.birthday}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.rank"
                    className="text-gray-700"
                  >
                    Unvon *
                  </Label>
                  <Input
                    id="inspector_details.rank"
                    name="inspector_details.rank"
                    value={formik.values.inspector_details.rank}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Mayor"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.rank &&
                        formik.errors.inspector_details?.rank &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.rank &&
                    formik.errors.inspector_details?.rank && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.rank}
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Jinsi *</Label>
                <RadioGroup
                  name="inspector_details.gender"
                  value={formik.values.inspector_details.gender}
                  onValueChange={(value) =>
                    formik.setFieldValue("inspector_details.gender", value)
                  }
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                      Erkak
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                      Ayol
                    </Label>
                  </div>
                </RadioGroup>
                {formik.touched.inspector_details?.gender &&
                  formik.errors.inspector_details?.gender && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.inspector_details.gender}
                    </p>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.phone"
                    className="text-gray-700"
                  >
                    Telefon raqami *
                  </Label>
                  <Input
                    id="inspector_details.phone"
                    name="inspector_details.phone"
                    value={formik.values.inspector_details.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="+998901234567"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.phone &&
                        formik.errors.inspector_details?.phone &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.phone &&
                    formik.errors.inspector_details?.phone && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.phone}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.nationality"
                    className="text-gray-700"
                  >
                    Millati *
                  </Label>
                  <Input
                    id="inspector_details.nationality"
                    name="inspector_details.nationality"
                    value={formik.values.inspector_details.nationality}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="uzbek"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.nationality &&
                        formik.errors.inspector_details?.nationality &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.nationality &&
                    formik.errors.inspector_details?.nationality && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.nationality}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.passport_series"
                    className="text-gray-700"
                  >
                    Passport seriyasi *
                  </Label>
                  <Input
                    id="inspector_details.passport_series"
                    name="inspector_details.passport_series"
                    value={formik.values.inspector_details.passport_series}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="AD"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.passport_series &&
                        formik.errors.inspector_details?.passport_series &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.passport_series &&
                    formik.errors.inspector_details?.passport_series && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.passport_series}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.passport_number"
                    className="text-gray-700"
                  >
                    Passport raqami *
                  </Label>
                  <Input
                    id="inspector_details.passport_number"
                    name="inspector_details.passport_number"
                    value={formik.values.inspector_details.passport_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="1234567"
                    className={cn(
                      "focus:border-blue-400",
                      formik.touched.inspector_details?.passport_number &&
                        formik.errors.inspector_details?.passport_number &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.passport_number &&
                    formik.errors.inspector_details?.passport_number && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.passport_number}
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="inspector_details.pinfl"
                  className="text-gray-700"
                >
                  PINFL *
                </Label>
                <Input
                  id="inspector_details.pinfl"
                  name="inspector_details.pinfl"
                  value={formik.values.inspector_details.pinfl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="12345678901234"
                  className={cn(
                    "focus:border-blue-400",
                    formik.touched.inspector_details?.pinfl &&
                      formik.errors.inspector_details?.pinfl &&
                      "border-red-500"
                  )}
                />
                {formik.touched.inspector_details?.pinfl &&
                  formik.errors.inspector_details?.pinfl && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.inspector_details.pinfl}
                    </p>
                  )}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 text-blue-700">
                Manzil ma'lumotlari
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.address.region"
                    className="text-gray-700"
                  >
                    Viloyat/Shahar *
                  </Label>
                  <Select
                    name="inspector_details.address.region"
                    value={formik.values.inspector_details.address.region}
                    onValueChange={(value) => {
                      formik.setFieldValue(
                        "inspector_details.address.region",
                        value
                      );
                      formik.setFieldValue(
                        "inspector_details.address.district",
                        ""
                      );
                      formik.setFieldValue(
                        "inspector_details.address.neighborhood",
                        ""
                      );
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "focus:border-blue-400",
                        formik.touched.inspector_details?.address?.region &&
                          formik.errors.inspector_details?.address?.region &&
                          "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Viloyatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_REGIONS.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.inspector_details?.address?.region &&
                    formik.errors.inspector_details?.address?.region && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.address.region}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.address.district"
                    className="text-gray-700"
                  >
                    Tuman *
                  </Label>
                  <Select
                    name="inspector_details.address.district"
                    value={formik.values.inspector_details.address.district}
                    onValueChange={(value) => {
                      formik.setFieldValue(
                        "inspector_details.address.district",
                        value
                      );
                      formik.setFieldValue(
                        "inspector_details.address.neighborhood",
                        ""
                      );
                    }}
                    disabled={!formik.values.inspector_details.address.region}
                  >
                    <SelectTrigger
                      className={cn(
                        "focus:border-blue-400",
                        formik.touched.inspector_details?.address?.district &&
                          formik.errors.inspector_details?.address?.district &&
                          "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Tumanni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.inspector_details?.address?.district &&
                    formik.errors.inspector_details?.address?.district && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.address.district}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.address.neighborhood"
                    className="text-gray-700"
                  >
                    MFY *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between focus:border-blue-400",
                          formik.touched.inspector_details?.address
                            ?.neighborhood &&
                            formik.errors.inspector_details?.address
                              ?.neighborhood &&
                            "border-red-500"
                        )}
                        disabled={
                          !formik.values.inspector_details.address.district
                        }
                      >
                        {formik.values.inspector_details.address.neighborhood
                          ? MOCK_NEIGHBORHOODS.find(
                              (neighborhood) =>
                                neighborhood.id ===
                                formik.values.inspector_details.address
                                  .neighborhood
                            )?.name
                          : "MFY ni tanlang..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="MFY qidirish..." />
                        <CommandList>
                          <CommandEmpty>MFY topilmadi.</CommandEmpty>
                          <CommandGroup>
                            {filteredNeighborhoods.map((neighborhood) => (
                              <CommandItem
                                key={neighborhood.id}
                                value={neighborhood.id}
                                onSelect={() => {
                                  formik.setFieldValue(
                                    "inspector_details.address.neighborhood",
                                    neighborhood.id
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formik.values.inspector_details.address
                                      .neighborhood === neighborhood.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {neighborhood.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {formik.touched.inspector_details?.address?.neighborhood &&
                    formik.errors.inspector_details?.address?.neighborhood && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.address.neighborhood}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.address.detail"
                    className="text-gray-700"
                  >
                    Manzil tafsilotlari *
                  </Label>
                  <Textarea
                    id="inspector_details.address.detail"
                    name="inspector_details.address.detail"
                    value={formik.values.inspector_details.address.detail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="To'liq manzil"
                    className={cn(
                      "focus:border-blue-400 min-h-[40px]",
                      formik.touched.inspector_details?.address?.detail &&
                        formik.errors.inspector_details?.address?.detail &&
                        "border-red-500"
                    )}
                  />
                  {formik.touched.inspector_details?.address?.detail &&
                    formik.errors.inspector_details?.address?.detail && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.address.detail}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Workplace Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-blue-700">
                  Ish joyi ma'lumotlari
                </h3>
              </div>

              <div className="p-4 border rounded-lg space-y-4 bg-blue-50 border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="inspector_details.workplace.position"
                      className="text-gray-700"
                    >
                      Lavozimi *
                    </Label>
                    <Input
                      id="inspector_details.workplace.position"
                      name="inspector_details.workplace.position"
                      value={formik.values.inspector_details.workplace.position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        "focus:border-blue-400",
                        formik.touched.inspector_details?.workplace?.position &&
                          formik.errors.inspector_details?.workplace
                            ?.position &&
                          "border-red-500"
                      )}
                    />
                    {formik.touched.inspector_details?.workplace?.position &&
                      formik.errors.inspector_details?.workplace?.position && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.inspector_details.workplace.position}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="inspector_details.workplace.region"
                      className="text-gray-700"
                    >
                      Viloyat/Shahar *
                    </Label>
                    <Select
                      name="inspector_details.workplace.region"
                      value={formik.values.inspector_details.workplace.region}
                      onValueChange={(value) => {
                        formik.setFieldValue(
                          "inspector_details.workplace.region",
                          value
                        );
                        formik.setFieldValue(
                          "inspector_details.workplace.district",
                          ""
                        );
                        formik.setFieldValue(
                          "inspector_details.workplace.neighborhood",
                          ""
                        );
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          "focus:border-blue-400",
                          formik.touched.inspector_details?.workplace?.region &&
                            formik.errors.inspector_details?.workplace
                              ?.region &&
                            "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Viloyatni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {MOCK_REGIONS.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.inspector_details?.workplace?.region &&
                      formik.errors.inspector_details?.workplace?.region && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.inspector_details.workplace.region}
                        </p>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="inspector_details.workplace.district"
                      className="text-gray-700"
                    >
                      Tuman *
                    </Label>
                    <Select
                      name="inspector_details.workplace.district"
                      value={formik.values.inspector_details.workplace.district}
                      onValueChange={(value) => {
                        formik.setFieldValue(
                          "inspector_details.workplace.district",
                          value
                        );
                        formik.setFieldValue(
                          "inspector_details.workplace.neighborhood",
                          ""
                        );
                      }}
                      disabled={
                        !formik.values.inspector_details.workplace.region
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "focus:border-blue-400",
                          formik.touched.inspector_details?.workplace
                            ?.district &&
                            formik.errors.inspector_details?.workplace
                              ?.district &&
                            "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Tumanni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {filteredWorkplaceDistricts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.inspector_details?.workplace?.district &&
                      formik.errors.inspector_details?.workplace?.district && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.inspector_details.workplace.district}
                        </p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="inspector_details.workplace.neighborhood"
                      className="text-gray-700"
                    >
                      MFY *
                    </Label>
                    <Select
                      name="inspector_details.workplace.neighborhood"
                      value={
                        formik.values.inspector_details.workplace.neighborhood
                      }
                      onValueChange={(value) =>
                        formik.setFieldValue(
                          "inspector_details.workplace.neighborhood",
                          value
                        )
                      }
                      disabled={
                        !formik.values.inspector_details.workplace.district
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "focus:border-blue-400",
                          formik.touched.inspector_details?.workplace
                            ?.neighborhood &&
                            formik.errors.inspector_details?.workplace
                              ?.neighborhood &&
                            "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="MFY ni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {filteredWorkplaceNeighborhoods.map((neighborhood) => (
                          <SelectItem
                            key={neighborhood.id}
                            value={neighborhood.id}
                          >
                            {neighborhood.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.inspector_details?.workplace
                      ?.neighborhood &&
                      formik.errors.inspector_details?.workplace
                        ?.neighborhood && (
                        <p className="text-red-500 text-sm">
                          {
                            formik.errors.inspector_details.workplace
                              .neighborhood
                          }
                        </p>
                      )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.workplace.note"
                    className="text-gray-700"
                  >
                    Izoh
                  </Label>
                  <Textarea
                    id="inspector_details.workplace.note"
                    name="inspector_details.workplace.note"
                    value={formik.values.inspector_details.workplace.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="focus:border-blue-400 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="inspector_details.workplace.status"
                    className="text-gray-700"
                  >
                    Holati *
                  </Label>
                  <Select
                    name="inspector_details.workplace.status"
                    value={
                      formik.values.inspector_details.workplace.status
                        ? "active"
                        : "inactive"
                    }
                    onValueChange={(value) =>
                      formik.setFieldValue(
                        "inspector_details.workplace.status",
                        value === "active"
                      )
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "focus:border-blue-400",
                        formik.touched.inspector_details?.workplace?.status &&
                          formik.errors.inspector_details?.workplace?.status &&
                          "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Holatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="inactive">Faol emas</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.inspector_details?.workplace?.status &&
                    formik.errors.inspector_details?.workplace?.status && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.inspector_details.workplace.status}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300"
                onClick={() => formik.resetForm()}
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={formik.isSubmitting}
              >
                Qo'shish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
