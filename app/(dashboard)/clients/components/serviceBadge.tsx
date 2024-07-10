import clsx from "clsx";
import Image from "next/image";

interface Props{
    service: string;
    icon: string;
}

export const ServiceBadge: React.FC<Props> = ({ service, icon=''}) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": service === "Photography",
        "bg-blue-600": service === "Cinematography",
        "bg-red-600": service === "Engagement",
        "bg-red-700": service === "Photobooth",
      })}
    >
      <Image
        src={icon}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {service}
      </p>
    </div>
  );
};
