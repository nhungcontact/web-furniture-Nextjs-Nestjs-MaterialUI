"use client";

import useUserCreate from "@/hooks/users/useUserCreate";
import { UserCreateInput, UserRole } from "@/types/user";
import { jsonForm } from "@/utils/form";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { FormEvent, useTransition } from "react";

export type UserCreateDialogProps = object;

function UserCreateDialog() {
  const t = useTranslations("UserCreateDialog");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { trigger, error, isMutating } = useUserCreate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger({
      body: jsonForm<UserCreateInput>(e.currentTarget),
    }).then(() => {
      startTransition(() => {
        router.back();
      });
    });
  };

  return (
    <Dialog open>
      <form onSubmit={handleSubmit}>
        {isPending && (
          <LinearProgress sx={{ position: "absolute", left: 0, right: 0, top: 0 }} />
        )}
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("displayName")}
            name="displayName"
            size="small"
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextField
            label={t("username")}
            name="username"
            size="small"
            fullWidth
            sx={{ mt: 3 }}
          />
          <TextField
            label={t("email")}
            name="email"
            size="small"
            type="email"
            fullWidth
            sx={{ mt: 3 }}
          />
          <TextField
            label={t("tel")}
            name="tel"
            size="small"
            type="tel"
            fullWidth
            sx={{ mt: 3 }}
          />
          <TextField
            select
            label={t("role")}
            name="role"
            size="small"
            fullWidth
            sx={{ mt: 3 }}
            defaultValue={"member"}
          >
            {Object.values(UserRole).map((role) => (
              <MenuItem
                key={role}
                value={role}
              >
                {role}
              </MenuItem>
            ))}
          </TextField>
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

export default UserCreateDialog;
