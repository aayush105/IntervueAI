import { LuClock, LuTarget, LuBookOpen } from "react-icons/lu";

const RoleInfoHeaderSkeleton = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 relative overflow-hidden border-b border-emerald-200 animate-pulse">
      <div className="container mx-auto px-4 md:px-0">
        <div className="py-8 relative z-10">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex-shrink-0 shadow-lg border border-emerald-100" />

            {/* Content */}
            <div className="flex-grow min-w-0 space-y-4">
              <div className="h-6 w-1/3 bg-gray-300 rounded" />
              <div className="flex items-start gap-2">
                <LuTarget className="w-5 h-5 text-emerald-300" />
                <div className="h-4 w-2/3 bg-gray-300 rounded" />
              </div>
              <div className="h-3 w-3/4 bg-gray-200 rounded" />

              <div className="flex flex-wrap gap-3 mt-4">
                <div className="h-8 w-36 bg-gray-200 rounded-full" />
                <div className="h-8 w-24 bg-gray-200 rounded-full" />
                <div className="h-8 w-32 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-full overflow-hidden opacity-5">
          <div className="absolute top-8 right-8 w-32 h-32 bg-emerald-300 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-teal-300 rounded-full blur-2xl delay-1000"></div>
          <div className="absolute top-12 right-32 w-20 h-20 bg-green-200 rounded-full blur-2xl delay-500"></div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeaderSkeleton;
