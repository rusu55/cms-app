import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image src="/images/logo.svg" width={28} height={28} alt="logo" />
        <p className="text-white font-semibold text-2xl pl-2.5">CMS Platform</p>
      </div>
    </Link>
  );
};
