const GridBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Primary gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"
        aria-hidden="true"
      />

      {/* Large grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff15_1.5px,transparent_1.5px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      {/* Smaller grid pattern for detail */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1rem_1rem]"
        aria-hidden="true"
      />

      {/* Subtle overlay for depth */}
      <div
        className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-br from-transparent to-black/5"
        aria-hidden="true"
      />
    </div>
  );
};

export default GridBackground;
