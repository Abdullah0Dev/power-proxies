import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Latest5PurchasedType } from "@/app/(root)/admin/page";

const LatestSales: React.FC<Latest5PurchasedType> = ({ lastSales }) => {
  // Ensure `lastSales` is always an array
  const salesData = Array.isArray(lastSales) ? lastSales : [];

  if (salesData.length === 0) {
    // Show fallback UI if no sales data is available
    return <p className="text-muted-foreground">No recent sales available.</p>;
  }

  return (
    <div className="space-y-8">
      {salesData.map((item, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                item.user_image ??
                "https://power-proxies.vercel.app/avaters/01.png"
              }
              alt={item.username}
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.username} -{" "}
              <span
                className={`${
                  item.sale_period === "month" ? "text-[#C6E3DF]" : ""
                } ${item.sale_period === "week" ? "text-[#3B82F6]" : ""} ${
                  item.sale_period === "day" ? "text-[#264754]" : ""
                }`}
              >
                {item.sale_period}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">{item.user_email}</p>
          </div>
          <div className="ml-auto font-medium">+${item.sale_amount}</div>
        </div>
      ))}
    </div>
  );
};

export default LatestSales;
