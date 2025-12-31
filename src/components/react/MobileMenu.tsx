import { useState } from "react";
import type { ReactNode } from "react";

interface MobileMenuProps {
  children: ReactNode;
}

/**
 * モバイルメニューのトグル機能を提供するReactコンポーネント
 * Astroのアイランドアーキテクチャで使用
 */
export default function MobileMenu({ children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="hidden max-[800px]:flex max-[800px]:bg-transparent max-[800px]:p-0 max-[800px]:border-none max-[800px]:cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`max-[800px]:content-[url('/img/icon/menu_open.svg')] ${
            isOpen
              ? "max-[800px]:content-[url('/img/icon/menu_close.svg')]"
              : ""
          }`}
        ></span>
      </button>
      <nav className={`group ${isOpen ? "active" : ""}`}>{children}</nav>
    </>
  );
}
