// Declarative Alert configuration
export const alertConfig = {
    base: "alert-base",

    variants: {
        // Semantic colour palette - drives --al-color, background, border and shadow.
        palette: {
            neutral: "alert-palette-neutral",
            info: "alert-palette-info",
            success: "alert-palette-success",
            warning: "alert-palette-warning",
            error: "alert-palette-error",
        },

        // Fixed position in the viewport.
        position: {
            "top-left": "alert-pos-top-left",
            "top-center": "alert-pos-top-center",
            "top-right": "alert-pos-top-right",
            "bottom-left": "alert-pos-bottom-left",
            "bottom-center": "alert-pos-bottom-center",
            "bottom-right": "alert-pos-bottom-right",
        },

        // Border radius.
        rounded: {
            true: "alert-rounded",
        },
    }
};
