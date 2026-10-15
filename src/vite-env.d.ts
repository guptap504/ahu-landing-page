/// <reference types="vite/client" />

declare module "virtual:blog-posts" {
  const posts: import("./lib/posts").Post[];
  export default posts;
}
