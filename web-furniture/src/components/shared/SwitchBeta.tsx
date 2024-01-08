import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { secondary } from '@/config/theme';
import { neutral } from '@/config/theme';
// import { theme } from '@/config/theme'
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// eslint-disable-next-line @typescript-eslint/no-empty-function
// import { ThemeModeContext } from '@/providers/ThemeModeContext'

type Props = {
    children: React.ReactNode;
};

function MyApp({ children }: Props) {
    const theme = useTheme();
    // const colorMode = React.useContext(ThemeModeContext);

    return (
        <Box
            sx={{
                display: 'flex',

                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            {theme.palette.mode} mode
            {children}
        </Box>
    );
}

export default function SwitchBeta() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const oldTheme = useTheme()
    const themeCus = React.useMemo(
        () =>
            createTheme({
                ...oldTheme, // Ghi đè các thuộc tính của theme cũ
                palette: {
                    mode,
                },
            }),
        [mode, oldTheme],
    );

    return (
        // <ThemeModeContext.Provider value={themeCus}>
        <ThemeProvider theme={themeCus}>
            <MyApp>
                <div
                    className='container'
                    style={{
                        height: '42px',
                        width: '88px',
                        borderRadius: '8px',
                        background: mode == 'light' ? '#FFFFFF' : `${neutral[400]}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        transition: 'all .15s',
                    }}
                >
                    <div
                        style={{
                            height: '35px',
                            width: '35px',
                            borderRadius: '100%',
                            //   background: changeThemeLight,
                            // background: !toggleTheme ? `${secondary[400]}` : 'transparent',
                            background: mode == 'light' ? `${secondary[400]}` : 'transparent',
                            margin: '3px 0 0 4px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all .35s',
                        }}
                        onClick={colorMode.toggleColorMode}
                    >
                        <LightModeIcon
                            fontSize='medium'
                            // sx={{ color: !toggleTheme ? '#FFFFFF' : `${neutral[50]}` }}
                            sx={{ color: mode == 'light' ? '#FFFFFF' : `${neutral[50]}` }}
                        />
                    </div>
                    <div
                        style={{
                            height: '35px',
                            width: '35px',
                            borderRadius: '100%',
                            background: mode == 'dark' ? `${secondary[400]}` : 'transparent',
                            // background: mode == 'light' ? '#FFFFFF' : `${neutral[400]}`,
                            margin: '3px 4px 0 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all .35s',
                        }}
                        onClick={colorMode.toggleColorMode}
                    >
                        <DarkModeIcon
                            fontSize='medium'
                            // sx={{ color: toggleTheme ? '#000000' : `${neutral[400]}` }}
                            sx={{ color: mode == 'dark' ? '#000000' : `${neutral[400]}` }}
                        />
                    </div>
                </div >
            </MyApp>
        </ThemeProvider>
        // </ThemeModeContext.Provider>
    );
}