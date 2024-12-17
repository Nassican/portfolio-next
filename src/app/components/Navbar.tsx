"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BatteryIcon,
  ChevronDown,
  FolderOpen,
  NetworkIcon,
  UploadCloud,
  Volume2Icon,
} from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";

interface NavbarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  dropdown?: {
    label: string;
    href: string;
  }[];
}

const WindowsStyleNavbar: React.FC = () => {
  const [activeDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm"));
  const [currentDate, setCurrentDate] = useState(dayjs().format("DD/MM/YYYY"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setCurrentTime(now.format("HH:mm"));
      setCurrentDate(now.format("DD/MM/YYYY"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems: NavbarItem[] = [
    {
      label: "Explorador",
      href: "/",
      icon: FolderOpen,
      dropdown: [
        { label: "Documentos", href: "/" },
        { label: "Imágenes", href: "/imagenes" },
      ],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderDropdown = (item: NavbarItem) => {
    if (!item.dropdown) return null;

    return (
      <div
        className={`absolute top-full left-0 mt-1 bg-opacity-80 backdrop-blur-[8px] border border-gray-300 shadow-lg ${
          activeDropdown === item.label ? "block" : "hidden"
        }`}
      >
        {item.dropdown.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className="block px-4 py-2 hover:bg-gray-200 text-sm text-black"
          >
            {subItem.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-[8px] border-gray-800 border-b shadow-sm">
      {/* Barra de Menú Superior (Estilo Windows 7) */}
      <div className="h-14 bg-gradient-to-b flex items-center justify-between border-b border-gray-400">
        {/* Logo del Sistema */}
        <div className="flex items-center space-x-2 h-full">
          <Image
            src="/windows-7-logo.webp"
            alt="Windows Logo"
            className="w-12 h-12 transition-all duration-200 hover:brightness-150 hover:drop-shadow-[0_0_2px_rgba(255,255,255,0.7)] cursor-pointer mx-4"
            width={48}
            height={48}
          />
          <div className="flex space-x-2 h-full">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center bg-gradient-to-b justify-center w-24 h-full px-2 hover:brightness-105 relative group cursor-pointer">
                  {/* Brillo en la parte superior */}
                  <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-white to-transparent opacity-40 rounded-t-md shadow-[0_4px_10px_0_rgba(255,255,255,0.3)] pointer-events-none"></div>

                  {/* Bordes */}
                  <div className="absolute inset-0 border border-gray-800 rounded-md"></div>
                  <div className="absolute inset-[1px] border-[1.5px] border-gray-400 rounded-[5px]"></div>

                  {/* Contenido */}
                  <div className="relative z-10 h-full w-full flex items-center justify-center">
                    <Image
                      src="/carpetas-sistema.webp"
                      width={46}
                      height={34}
                      alt="Folder Icon"
                      className="opacity-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menú de Navegación Principal */}

        {/* Área de Sistema */}
        <div className="flex items-center h-full space-x-4">
          <HiddenIcons
            icons={[
              { id: "1", icon: <NetworkIcon />, tooltip: "Red" },
              { id: "2", icon: <Volume2Icon />, tooltip: "Volumen" },
              { id: "3", icon: <BatteryIcon />, tooltip: "Batería" },
              { id: "4", icon: <UploadCloud />, tooltip: "Actualizaciones" },
              // ... más iconos
            ]}
            maxVisible={2}
          />
          <div className="flex flex-col items-center">
            <div className="text-sm text-white">{currentTime}</div>
            <div className="text-sm text-white">{currentDate}</div>
          </div>
          <div className="relative w-4 h-full mr-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-500 opacity-10 hover:opacity-20 backdrop-blur-[8px] border border-gray-100"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface HiddenIconsProps {
  icons: {
    id: string;
    icon: React.ReactNode;
    tooltip?: string;
  }[];
  maxVisible?: number;
}

const HiddenIcons: React.FC<HiddenIconsProps> = ({ icons, maxVisible = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleIcons = icons.slice(0, maxVisible);
  const hiddenIcons = icons.slice(maxVisible);

  return (
    <div className="relative flex items-center h-full gap-1">
      {/* Botón de expansión */}
      {hiddenIcons.length > 0 && (
        <div className="relative h-[90%]">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-haspopup="true"
            className="w-6 h-full flex items-center justify-center hover:bg-white/20 rounded-sm"
          >
            <ChevronDown
              className={`text-gray-100 transition-transform duration-150 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Menú desplegable */}
          {isExpanded && (
            <div
              className="absolute top-full right-0 mt-2 bg-white bg-opacity-90 border border-gray-300 
              rounded-md shadow-lg p-3 z-50 min-w-[200px] backdrop-blur-sm animate-fadeIn"
            >
              <div className="grid grid-cols-3 gap-2">
                {hiddenIcons.map((icon) => (
                  <div
                    key={icon.id}
                    className="w-8 h-8 flex items-center justify-center
                    hover:bg-blue-100 rounded-sm
                    transition-colors duration-150 group"
                    title={icon.tooltip}
                  >
                    <div className="text-gray-600 group-hover:text-gray-800">
                      {icon.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Iconos visibles */}
      <div className="flex space-x-1 h-[90%]">
        {visibleIcons.map((icon) => (
          <div
            key={icon.id}
            className="w-8 py-1 h-full flex items-center justify-center px-1 hover:bg-white/20 rounded-sm transition-colors duration-150"
            title={icon.tooltip}
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WindowsStyleNavbar;
