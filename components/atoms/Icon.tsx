import type { IconType } from "react-icons";
import {
  FaApple,
  FaBluesky,
  FaDiscord,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiEdit2,
  FiMail,
  FiMenu,
  FiRefreshCw,
  FiSend,
  FiUsers,
  FiVideo,
  FiX,
} from "react-icons/fi";
import { LuKeyboard, LuShieldCheck } from "react-icons/lu";
import { cn } from "@/lib/cn";

export type IconName =
  | "calendar"
  | "edit"
  | "meet"
  | "keyboard"
  | "sync"
  | "users"
  | "mail"
  | "github"
  | "x"
  | "bluesky"
  | "discord"
  | "apple"
  | "testflight"
  | "shield"
  | "arrow-right"
  | "check"
  | "menu"
  | "close";

const iconMap: Record<IconName, IconType> = {
  calendar: FiCalendar,
  edit: FiEdit2,
  meet: FiVideo,
  keyboard: LuKeyboard,
  sync: FiRefreshCw,
  users: FiUsers,
  mail: FiMail,
  github: FaGithub,
  x: FaXTwitter,
  bluesky: FaBluesky,
  discord: FaDiscord,
  apple: FaApple,
  testflight: FiSend,
  shield: LuShieldCheck,
  "arrow-right": FiChevronRight,
  check: FiCheck,
  menu: FiMenu,
  close: FiX,
};

type Props = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, className, ...rest }: Props) {
  const Component = iconMap[name];
  return (
    <Component
      size={size}
      aria-hidden
      className={cn("flex-shrink-0", className)}
      {...rest}
    />
  );
}
