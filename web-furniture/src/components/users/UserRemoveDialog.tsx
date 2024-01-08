"use client";

import useUserRemove from "@/hooks/users/useUserRemove";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

export type UserRemoveDialogProps = {
  id: string;
};

function UserRemoveDialog({ id }: UserRemoveDialogProps) {
  const t = useTranslations("UserRemoveDialog");
  const router = useRouter();
  const { trigger, error, isMutating } = useUserRemove(id);

  const handleRemove = () => {
    trigger().then(() => {
      router.back();
    });
  };

  return (
    <Dialog
      open
      fullWidth
    >
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("content")}</DialogContentText>
        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            [{error?.code}] {error?.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          type="button"
          onClick={router.back}
          disabled={isMutating}
        >
          {t("cancel")}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          onClick={handleRemove}
          disabled={isMutating}
          endIcon={isMutating && <CircularProgress size={24} />}
        >
          {t("remove")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserRemoveDialog;
