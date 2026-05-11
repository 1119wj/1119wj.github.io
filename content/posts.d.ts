declare module "@/content/posts/*.mdx" {
  import type { ComponentType } from "react";
  const Component: ComponentType;
  export default Component;
}
