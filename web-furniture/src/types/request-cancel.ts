import { Main } from "./main";

export enum ProcessingStatus {
  Pending = "Pending", //Yêu cầu đã được nhận nhưng chưa được xử lý hoặc đánh giá.
  Approved = "Approved", //Yêu cầu hủy đã được chấp nhận, và quá trình hủy đơn hàng sẽ được tiếp tục.
  Denied = "Denied", //Yêu cầu hủy đã được xem xét và từ chối, nghĩa là đơn hàng sẽ không bị hủy.
}

export interface RequestCancel extends Main {
  user: string;
  bill: string;
  reason: string;
  processingStatus: ProcessingStatus;
  requestDate: Date;
}
