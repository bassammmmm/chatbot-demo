import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledButtonProps {
    bgColor: string;
    textColor: string;
    hoverBgColor?: string;
    borderRadius?: string;
}

export const StyledButton = styled(Button, {
    shouldForwardProp: (prop) =>
        prop !== "bgColor" &&
        prop !== "textColor" &&
        prop !== "hoverBgColor" &&
        prop !== "borderRadius",
})<StyledButtonProps>(({ bgColor, textColor, hoverBgColor, borderRadius }) => ({
    width: "160px",
    height: "40px",
    borderRadius: borderRadius || "100px",
    backgroundColor: bgColor,
    color: textColor,
    textTransform: "none",
    "&:hover": {
        backgroundColor: hoverBgColor || bgColor,
    },
}));