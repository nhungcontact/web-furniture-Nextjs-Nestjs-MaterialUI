import { Contact, ContactUpdateInput } from "@/types/contact";
import "client-only";
import useMutation from "../useMutation";

function useContactUpdateStatus(id: string) {
  return useMutation<Contact, ContactUpdateInput>({
    path: `/api/contacts/${id}`,
    method: "PATCH",
    mutateRelatedDataList: {
      mutatePath: `/api/contacts`,
    },
  });
}

export default useContactUpdateStatus;
