"use client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  GitPullRequestDraft,
  ChartNoAxesCombined,
  LogOut,
  MenuIcon,
  PanelLeft,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  { id: 1, label: "Dashboard", icon: GitPullRequestDraft, link: "/admin" },
  {
    id: 2,
    label: "Statistics",
    icon: ChartNoAxesCombined,
    link: "/admin/proxy-info",
  },
  // { id: 3, label: "Manage Users", icon: AlarmPlusIcon, link: "/users" },
  // { id: 4, label: "Manage Tutorials", icon: AlarmPlusIcon, link: "/tutorials" },
];

const TestSidebar = ({ toggleCollapse, onToggleCollapse }) => {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [ActiveTab, setActiveTab] = useState(2);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "http://localhost:3000/admin") {
      setActiveTab(1);
    } else {
      setActiveTab(2);
    }
  }, [router.pathname]);
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg- light dark:bg-darkMode-1 bg-[#f0f8ff] flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded-full bg-black/15 absolute -right-12",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer dark:hover:bg-darkMode-2/50 hover:bg-darkMode-2/5  rounded w-full overflow-hidden   whitespace-nowrap",
      {
        ["bg-not-working"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <Sheet>
      <SheetTrigger className="absolute top-5 left-5 hidden max-xl:flex ">
        {" "}
        <MenuIcon />{" "}
      </SheetTrigger>
      <div
        className={
          wrapperClasses +
          ` max-xl:hidden fixed ${toggleCollapse === false && "min-w- 60"} `
        }
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center relative pl-1 gap-4">
              <Image
                src={"/logo.png"}
                alt={"logo"}
                width={50}
                height={50}
                className="max-w-full h-auto"
              />
              <h
                className={classNames(
                  "mt-2 flex text-xl font-medium text-text",
                  {
                    hidden: toggleCollapse,
                  }
                )}
              >
                PowerProxies
              </h>
            </div>
            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={onToggleCollapse}
              >
                <PanelLeft />
              </button>
            )}
          </div>

          <div className="flex flex-col items-start mt-24">
            {menuItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <div
                  key={menu.id}
                  className={
                    classes + ` ${ActiveTab === menu.id && "bg-[#3B82F6]"}`
                  }
                >
                  <Link onClick={() => setActiveTab(menu.id)} href={menu.link}>
                    <div
                      className={`flex py-3 px-3 items-center w-full h-full`}
                    >
                      <div style={{ width: "2.5rem" }}>
                        <Icon />
                      </div>
                      {!toggleCollapse && (
                        <span
                          className={classNames(
                            "text-md font-medium text-text-light"
                          )}
                        >
                          {/* 1250 */}
                          {menu.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <SheetContent
          side={"left"}
          className={wrapperClasses + " "}
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseOver}
          style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between relative">
              <Link
                href={"/"}
                className="flex cursor-pointer items-center pl-1 gap-4"
              >
                <Image
                  src={"/logo.png"}
                  alt={"logo"}
                  width={50}
                  height={50}
                  className="max-w-full h-auto"
                />
                <span
                  className={classNames("mt-2 text-xl font-medium text-text", {
                    hidden: toggleCollapse,
                  })}
                >
                  PowerProxies
                </span>
              </Link>
            </div>

            <div className="flex flex-col items-start mt-24">
              {menuItems.map(({ icon: Icon, ...menu }) => {
                const classes = getNavItemClasses(menu);
                return (
                  <div
                    key={menu.id}
                    className={
                      classes + ` ${ActiveTab === menu.id && " bg-[#3B82F6]  "}`
                    }
                  >
                    <Link
                      onClick={() => setActiveTab(menu.id)}
                      href={menu.link}
                    >
                      <div
                        className={`flex py-3 px-3 items-center w-full h-full`}
                      >
                        <div style={{ width: "2.5rem" }}>
                          <Icon />
                        </div>
                        {!toggleCollapse && (
                          <span
                            className={classNames(
                              "text-md font-medium text-text-light"
                            )}
                          >
                            {/* 1250 */}
                            {menu.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`${getNavItemClasses({})} px-3 py-3`}>
            <div style={{ width: "2.5rem" }}>
              <LogOut />
            </div>
            {!toggleCollapse && (
              <span
                className={classNames("text-md font-medium text-text-light")}
              >
                Logout
              </span>
            )}
          </div>
        </SheetContent>

        <div className={`${getNavItemClasses({})} px-3 py-3`}>
          <div style={{ width: "2.5rem" }}>
            <LogOut />
          </div>
          {!toggleCollapse && (
            <span className={classNames("text-md font-medium text-text-light")}>
              Logout
            </span>
          )}
        </div>
      </div>
    </Sheet>
  );
};

export default TestSidebar;
