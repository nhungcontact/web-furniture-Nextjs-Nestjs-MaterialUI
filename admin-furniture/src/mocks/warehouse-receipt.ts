import { WarehouseReceiptHead } from "@/types/warehouse-receipt";

export const warehouseReceiptHeadCells: readonly WarehouseReceiptHead[] = [
  {
    id: "user",
    label: "User",
  },
  {
    id: "provider",
    label: "Provider",
  },
  {
    id: "totalPrice",
    label: "Total Price",
  },
  {
    id: "note",
    label: "Note",
  },
  {
    id: "importDate",
    label: "Import Date",
  },
  {
    id: "confirmationDate",
    label: "Confirm Date",
  },
  {
    id: "status",
    label: "Status",
  },
];
