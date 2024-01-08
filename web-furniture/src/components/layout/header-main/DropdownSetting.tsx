import { appLocales } from "@/config/locales";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next-intl/client";

export default function DropdownSetting() {
  const t = useTranslations("LocaleSwitcher");
  const tM = useTranslations("MainPage");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuItemClick = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale}${pathname}`);
    });
    // Perform any additional logic or actions based on the selected locale
    // For example, you might want to update the language in your app
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Tooltip title={tM("Language settings")}>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <SettingsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          zIndex: 1000,
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  //   onKeyDown={handleListKeyDown}
                  //   onChange={onSelectChange}
                  sx={{
                    mt: 1,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 40,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  }}
                >
                  {appLocales.map(({ locale }) => (
                    <MenuItem
                      key={locale}
                      value={locale}
                      //   onClick={handleClose}
                      selected={currentLocale === locale}
                      onClick={() => handleMenuItemClick(locale)}
                    >
                      <ListItemIcon>
                        <Image
                          src={`/images/${t("locale", { locale })}.png`}
                          alt="Viet Name"
                          height={"20"}
                          width={"25"}
                        />
                      </ListItemIcon>
                      {t("locale", { locale })}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
