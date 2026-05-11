import createMDX from "@next/mdx";
import { remarkPlugins, rehypePlugins } from "./lib/mdx.mjs";

const withMDX = createMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
  },
});

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
