import Image from "next/image";

interface PostImageProps {
  id: number;
}

export function PostImage({ id }: PostImageProps) {
  return (
    <div className="rounded-[28px] overflow-hidden border border-border aspect-video relative group/img bg-secondary/50">
      <Image
        src={`https://picsum.photos/seed/${id + 22}/1200/675`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
        alt="Post content"
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        priority={false}
      />
    </div>
  );
}
