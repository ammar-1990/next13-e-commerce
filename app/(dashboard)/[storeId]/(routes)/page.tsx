import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Heading from "@/components/heading";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

import React from "react";

type Props = { params: { storeId: string } };

const page = async ({ params }: Props) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId)
  const stockCount = await getStockCount(params.storeId)
  const graphRevenue = await getGraphRevenue(params.storeId)

  const cards = [
    {
      title: "Total Revenue",
      Icon: DollarSign,
      value: formatter.format(totalRevenue),
    },
    {
      title: "Sales",
      Icon: CreditCard,
      value: `+${salesCount}`,
    },
    {
      title: "Products in stock",
      Icon: Package,
      value: stockCount,
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid sm:grid-cols-3 gap-3">
          {cards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex items-center justify-between flex-row">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={graphRevenue} />
            </CardContent>
    
        </Card>
      </div>
    </div>
  );
};

export default page;
