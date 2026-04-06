export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f4c3a] via-[#00897b] to-[#4db6ac] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );
}