import { Contact, ContactCreateInput } from "@/types/contact";
import "client-only";
import useMutation from "../useMutation";

function useContactCreate() {
  return useMutation<Contact, ContactCreateInput>({
    path: "/api/contacts",
    method: "POST",
    mutateRelatedDataList: {
      mutatePath: `/api/contacts`,
      insertOnNotFound: "start",
    },
  });
}

export default useContactCreate;
