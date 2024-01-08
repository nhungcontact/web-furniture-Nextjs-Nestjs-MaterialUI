// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Blog from "@/components/blog/Blog";
import React from "react";

async function BlogPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return <Blog />;
}

export default BlogPage;
