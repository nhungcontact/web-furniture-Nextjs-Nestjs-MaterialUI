import { useRouter } from "next-intl/client";

export const useRouterConfig = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const handleNavigateReplace = (path: string) => {
    router.replace(path);
  };
  return { handleBack, handleNavigate, handleNavigateReplace };
};
