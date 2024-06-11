import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1">Calendar</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default layout;
