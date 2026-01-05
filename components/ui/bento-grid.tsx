import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  slug,
  tags,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  slug?: string;
  tags?: string[];
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl shadow-xl transition duration-500 dark:shadow-none p-8 dark:bg-black dark:border-white/20 bg-white/70 backdrop-blur-md border border-black/15 justify-between flex flex-col space-y-4 hover:-translate-y-1 relative cursor-pointer",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-black/3 flex items-center justify-center border border-black/5">
            {icon}
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 py-0.5 rounded-full bg-black/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="font-serif font-medium text-2xl mb-2 mt-2">{title}</div>
        <div className="font-normal text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {description}
        </div>
      </div>
      <a href={`/projects/${slug}`} className="absolute inset-0 z-20" />
    </div>
  );
};
