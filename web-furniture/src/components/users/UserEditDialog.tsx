"use client";

import React, { FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@mui/material";
import useUserDetail from "@/hooks/users/useUserDetail";
import { useRouter } from "next-intl/client";
import LoadingOverlay from "../shared/LoadingOverlay";
import ErrorDialog from "../errors/ErrorDialog";
import useUserUpdate from "@/hooks/users/useUserUpdate";
import { jsonForm } from "@/utils/form";

export type UserEditDialogProps = {
  id: string;
};

function UserEditDialog({ id }: UserEditDialogProps) {
  const t = useTranslations("UserEditDialog");
  const router = useRouter();
  const { data: user, error: userError, isLoading, isValidating } = useUserDetail(id);
  const { trigger, error, isMutating } = useUserUpdate(id);

  if (isLoading) {
    return <LoadingOverlay open />;
  }

  if (userError) {
    return (
      <ErrorDialog
        open
        error={{
          name: userError.code,
          message: userError.message,
        }}
        onClose={router.back}
      />
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({
      body: jsonForm(e.currentTarget),
    }).then(() => {
      router.back();
    });
  };

  return (
    <Dialog open>
      <form onSubmit={handleSubmit}>
        {isValidating && (
          <LinearProgress sx={{ position: "absolute", left: 0, right: 0, top: 0 }} />
        )}
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("displayName")}
            defaultValue={user?.displayName}
            name="displayName"
            size="small"
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextField
            label={t("email")}
            defaultValue={user?.email}
            name="email"
            size="small"
            fullWidth
            sx={{ mt: 3 }}
          />
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
            type="submit"
            variant="contained"
            disabled={isMutating}
            endIcon={isMutating && <CircularProgress size={24} />}
          >
            {t("save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UserEditDialog;
