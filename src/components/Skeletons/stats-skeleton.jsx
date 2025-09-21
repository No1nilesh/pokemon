export default function StatsSkeleton() {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => {
                const height = Math.floor(Math.random() * 150) + 20; // between 20px and 120px
                return (
                    <div
                        key={index}
                        style={{ height: `${height}px` }}
                        className=" w-12 bg-gray-800 animate-pulse rounded-sm"
                    ></div>
                );
            })}
        </>
    )
};
