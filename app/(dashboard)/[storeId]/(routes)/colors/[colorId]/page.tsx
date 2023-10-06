import ColorForm from "@/components/color-form";

import db from "@/lib/prismadb";
import React from "react";

type Props = {
  params: { colorId: string };
};

const page = async ({ params }: Props) => {
  const color = await db.color.findFirst({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-6 gap-y-4">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default page;
