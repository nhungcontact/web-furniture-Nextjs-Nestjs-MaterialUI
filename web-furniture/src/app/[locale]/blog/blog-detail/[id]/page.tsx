// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import BlogDetail from "@/components/blog/blog-detail/BlogDetail";
import React from "react";

async function BlogDetailPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return <BlogDetail />;
}

export default BlogDetailPage;
