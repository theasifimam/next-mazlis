interface PostContentProps {
  children: React.ReactNode;
}

export function PostContent({ children }: PostContentProps) {
  return (
    <p className="text-[15px] leading-relaxed text-foreground/90 font-medium">
      {children}
    </p>
  );
}
