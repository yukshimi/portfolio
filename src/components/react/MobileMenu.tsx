import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Prevent background scroll while the mobile menu is open
    const previousOverflow = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`group ${isOpen ? "active" : ""}`}>{children}</nav>
      <button
        className={[
          "hidden max-[800px]:flex max-[800px]:bg-transparent max-[800px]:border-none max-[800px]:cursor-pointer",
          // Put the close button inside the opened overlay (visually)
          isOpen
            ? "max-[800px]:fixed max-[800px]:top-4 max-[800px]:right-4 max-[800px]:z-[10000] max-[800px]:p-2"
            : "max-[800px]:p-0",
        ].join(" ")}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <img
          src={isOpen ? "/img/icon/menu_close.svg" : "/img/icon/menu_open.svg"}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
