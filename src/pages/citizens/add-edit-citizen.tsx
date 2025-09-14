import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CITIZENS, regions, districtsByRegion } from '@/const/mock.data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, User, CreditCard, MapPin, Save } from 'lucide-react';
import type { ICitizen } from '@/interfaces/citizen.interface';

const SectionCard = ({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <Card className="shadow-lg border-t-4 border-t-blue-500">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">{icon}</div>
                <div>
                    <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {children}
        </CardContent>
    </Card>
);

const FormItem = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="space-y-2">
        <Label className="font-medium text-gray-700">{label}</Label>
        {children}
    </div>
);

export default function AddEditCitizenPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [citizen, setCitizen] = useState<Partial<ICitizen>>({});
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const foundCitizen = MOCK_CITIZENS.find(c => c.id === id);
            if (foundCitizen) {
                setCitizen(foundCitizen);
            } else {
                toast.error('Xatolik', { description: 'Tahrirlash uchun fuqaro topilmadi.' });
                navigate('/citizens');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (field: keyof ICitizen, value: any) => {
        setCitizen(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log("Saqlanayotgan ma'lumotlar:", citizen);
        toast.success(isEditMode ? 'Muvaffaqiyatli tahrirlandi' : 'Muvaffaqiyatli qo\'shildi', {
            description: 'Barcha ma\'lumotlar konsolga chiqarildi.',
        });
        navigate('/citizens');
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{isEditMode ? 'Fuqaroni Tahrirlash' : 'Yangi Fuqaro Qo\'shish'}</h1>
                        <p className="text-gray-500">Fuqaro ma'lumotlarini to'ldiring yoki o'zgartiring.</p>
                    </div>
                </div>

                <SectionCard title="Shaxsiy ma'lumotlar" description="Fuqaroning asosiy shaxsiy ma'lumotlari." icon={<User size={24} />}>
                    <FormItem label="Ism"><Input value={citizen.first_name || ''} onChange={e => handleChange('first_name', e.target.value)} /></FormItem>
                    <FormItem label="Familiya"><Input value={citizen.last_name || ''} onChange={e => handleChange('last_name', e.target.value)} /></FormItem>
                    <FormItem label="Otasining ismi"><Input value={citizen.middle_name || ''} onChange={e => handleChange('middle_name', e.target.value)} /></FormItem>
                    <FormItem label="Tug'ilgan sana"><Input type="date" value={citizen.birthday || ''} onChange={e => handleChange('birthday', e.target.value)} /></FormItem>
                    <FormItem label="Jinsi">
                        <Select value={citizen.gender} onValueChange={value => handleChange('gender', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="male">Erkak</SelectItem><SelectItem value="female">Ayol</SelectItem></SelectContent></Select>
                    </FormItem>
                    <FormItem label="Telefon raqami"><Input value={citizen.phone || ''} onChange={e => handleChange('phone', e.target.value)} /></FormItem>
                </SectionCard>

                <SectionCard title="Pasport ma'lumotlari" description="Pasport va identifikatsiya raqamlari." icon={<CreditCard size={24} />}>
                    <FormItem label="Pasport seriyasi"><Input value={citizen.passport_series || ''} onChange={e => handleChange('passport_series', e.target.value)} /></FormItem>
                    <FormItem label="Pasport raqami"><Input type="number" value={citizen.passport_number || ''} onChange={e => handleChange('passport_number', e.target.value)} /></FormItem>
                    <FormItem label="JSHSHIR (PINFL)"><Input type="number" value={citizen.pinfl || ''} onChange={e => handleChange('pinfl', e.target.value)} /></FormItem>
                    <FormItem label="Millati"><Input value={citizen.nationality || ''} onChange={e => handleChange('nationality', e.target.value)} /></FormItem>
                </SectionCard>

                <SectionCard title="Yashash joyi" description="Doimiy yashash manzilini kiriting." icon={<MapPin size={24} />}>
                    <FormItem label="Viloyat">
                        <Select value={citizen.region} onValueChange={value => handleChange('region', value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{regions.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}</SelectContent></Select>
                    </FormItem>
                    <FormItem label="Tuman/Shahar">
                         <Select value={citizen.district} onValueChange={value => handleChange('district', value)} disabled={!citizen.region}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{(districtsByRegion[citizen.region || ''] || []).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
                    </FormItem>
                    <FormItem label="Mahalla"><Input value={citizen.neighborhood || ''} onChange={e => handleChange('neighborhood', e.target.value)} /></FormItem>
                    <FormItem label="Uy raqami"><Input value={citizen.house || ''} onChange={e => handleChange('house', e.target.value)} /></FormItem>
                </SectionCard>

                <div className="flex justify-end pt-4">
                    <Button size="lg" className="flex items-center gap-2" onClick={handleSave}>
                        <Save size={18} />
                        {isEditMode ? 'Saqlash' : 'Qo\'shish'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
