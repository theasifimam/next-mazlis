"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Plus, Save, X } from "lucide-react";
import { UserType } from "./type";

export default function UpdateProfileModal({
  updateModalOpen,
  setUpdateModalOpen,
  userInfo,
  setUserInfo,
}: {
  updateModalOpen: boolean;
  setUpdateModalOpen: (open: boolean) => void;
  userInfo: UserType;
  setUserInfo: (userInfo: UserType) => void;
}) {
  return (
    <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and save changes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 max-h-[calc(100vh-15rem)] overflow-y-auto">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="h-24 w-24 rounded-full border-2 border-black">
                <AvatarImage
                  src={userInfo.avatar}
                  className="object-cover rounded-full"
                />
                <AvatarFallback className="bg-black/10 rounded-full">
                  {userInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full bg-black text-white hover:bg-black/80 border-2 border-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                  verified: userInfo.verified,
                  stats: userInfo.stats,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={userInfo.username}
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Links</Label>
            {userInfo.links.map((link, index) => (
              <div key={index} className="flex gap-2 items-center mt-2">
                <Input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) => {
                    const newLinks = [...userInfo.links];
                    newLinks[index].title = e.target.value;
                    setUserInfo({ ...userInfo, links: newLinks });
                  }}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...userInfo.links];
                    newLinks[index].url = e.target.value;
                    setUserInfo({ ...userInfo, links: newLinks });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1 h-9 w-9"
                  onClick={() => {
                    setUserInfo({
                      ...userInfo,
                      links: userInfo.links.filter((_, i) => i !== index),
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2 rounded-full"
              onClick={() => {
                setUserInfo({
                  ...userInfo,
                  links: [...userInfo.links, { title: "", url: "" }],
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Link
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setUpdateModalOpen(false)}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setUpdateModalOpen(false)}
            className="rounded-full bg-black hover:bg-black/80"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
