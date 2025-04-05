// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  postAttachments: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "16MB", maxFileCount: 3 },
    file: { maxFileSize: "8MB", maxFileCount: 5 }
  })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;