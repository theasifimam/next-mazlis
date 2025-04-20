import { Settings, Lock, LogOut, User, HelpCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { avatars } from "@/lib/data/images";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.jpg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55 mr-4 rounded-3xl">
        {/* User Profile */}
        <DropdownMenuLabel>
          <Link
            className="flex items-center space-x-3 hover:bg-muted py-2 rounded-full"
            href="/u/asifimam"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatars[0]} alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-base font-semibold leading-none">John Doe</p>
              <p className="text-sm text-muted-foreground">@johndoe</p>
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Main Options */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 rounded-3xl text-gray-600 hover:bg-muted">
            <Link className="flex items-center" href="/u/asifimam">
              <User className="mr-1 h-5 w-5" />
              <span className="text-sm">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-3xl text-gray-600 hover:bg-muted">
            <Link className="flex items-center" href="/settings">
              <Settings className="mr-1 h-5 w-5" />
              <span className="text-sm">Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-3xl text-gray-600 hover:bg-muted">
            <Link className="flex items-center" href="/security">
              <Lock className="mr-1 h-5 w-5" />
              <span className="text-sm">Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 rounded-3xl text-gray-600 hover:bg-muted">
            <Link className="flex items-center" href="/help">
              <HelpCircle className="mr-1 h-5 w-5" />
              <span className="text-sm">Help</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="text-red-600 focus:text-red-600 p-3 rounded-3xl">
          <LogOut className="mr-1 h-5 w-5" />
          <span className="text-sm">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
