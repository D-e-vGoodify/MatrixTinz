import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavigationBar } from '@capgo/capacitor-navigation-bar';
import { KeepAwake } from '@capacitor-community/keep-awake';

export const triggerHaptic = async () => {
    try {
        await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
        if (navigator.vibrate) {
            navigator.vibrate(40);
        }
    }
}

export const updateSystemBar = async (isDarkMode, isBlue, isGreen, isYellow, isRed, isPurple) => {
    let activeHex = ""

    if (isDarkMode) {
        if (isBlue) {
            activeHex = "#002640"
        } else if (isGreen) {
            activeHex = "#004000"
        } else if (isYellow) {
            activeHex = "#403501"
        } else if (isRed) {
            activeHex = "#540B0B"
        } else if (isPurple) {
            activeHex = "#2B0B54"
        } else {
            activeHex = "#54220B"
        }
    } else {
        if (isBlue) {
            activeHex = "#DAE9F2"
        } else if (isGreen) {
            activeHex = "#DAF0DA"
        } else if (isYellow) {
            activeHex = "#F2EEDA"
        } else if (isRed) {
            activeHex = "#FCE8E8"
        } else if (isPurple) {
            activeHex = "#F3E8FC"
        } else {
            activeHex = "#FCF0E8"
        }
    }

    try {
        await StatusBar.setStyle({
            style:
            isDarkMode ? Style.Dark : Style.Light
        });

        await StatusBar.setBackgroundColor({ color: activeHex });

        await NavigationBar.setNavigationBarColor({ color: activeHex, darkButtons: !isDarkMode });
    } catch (error) {
        console.error("System bar configuration failed:", error)
    }
};

export const keepScreenOn = async () => {
    try {
        await KeepAwake.keepAwake();
    } catch (error) {
        console.error("Keep Awake failed:", error)
    }
}