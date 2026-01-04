"use client";

import { ScrollArea } from "@/components/ScrollArea";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

function NotificationSettings() {
  const notifications = [
    {
      id: 1,
      title: "Direct Messages",
      desc: "whether new messages notifications should appear or not",
    },
    {
      id: 2,
      title: "Post Likes",
      desc: "whether new post likes notifications should appear or not",
    },
    {
      id: 3,
      title: "New Followers",
      desc: "whether new follower notifications should appear or not",
    },
    {
      id: 4,
      title: "Mentions",
      desc: "Whether new mentions notifications should appear or not",
    },
  ];
  return (
    <main className="flex-1 bg-card overflow-hidden flex flex-col">
      <ScrollArea className="flex-1 p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-bold text-primary">Push Notifications</h2>
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex flex-col gap-0">
                  <p className="text-md font-medium text-foreground mb-[-20px]">
                    {item.title}
                  </p>
                  <br />
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </motion.div>
      </ScrollArea>
    </main>
  );
}

export default NotificationSettings;
