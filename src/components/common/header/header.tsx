import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="fixed w-full z-10 bg-white h-[60px] flex items-center p-2 justify-between border-b">
      <SidebarTrigger />
      <div className=""></div>
      <div></div>
    </header>
  );
}
