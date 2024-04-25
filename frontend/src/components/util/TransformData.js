export const transformDataForServer = (clientData) => {
    // Initialize an object to hold the transformed data
    const transformedData = {
        colors: [],
        radius: [],
        spacing: [],
        component: {
            button: [],
            input: [],
            select: []
        }
    };

    // Transform colors data
    if (clientData.colors) {
        transformedData.colors = clientData.colors.map(color => ({
            variableName: color.variableName,
            hexCode: color.hexCode
        }));
    }

    // Transform radius data
    if (clientData.radius) {
        transformedData.radius = clientData.radius.map(radiusItem => ({
            variableName: radiusItem.variableName,
            radiusValue: radiusItem.radiusValue
        }));
    }

    // Transform spacing data
    if (clientData.spacing) {
        transformedData.spacing = clientData.spacing.map(spacingItem => ({
            variableName: spacingItem.variableName,
            pxValue: spacingItem.pxValue,
            remValue: spacingItem.remValue
        }));
    }

    // Transform component data
    if (clientData.component) {
        // Transform button variants
        if (clientData.component.button) {
            transformedData.component.button = clientData.component.button.map(buttonVariant => ({
                name: buttonVariant.name,
                styles: {
                    backgroundColor: buttonVariant.styles.backgroundColor,
                    borderRadius: buttonVariant.styles.borderRadius,
                    paddingX: buttonVariant.styles.paddingX,
                    paddingY: buttonVariant.styles.paddingY
                }
            }));
        }

        // Transform input variants
        if (clientData.component.input) {
            transformedData.component.input = clientData.component.input.map(inputVariant => ({
                name: inputVariant.name,
                styles: {
                    backgroundColor: inputVariant.styles.backgroundColor,
                    borderRadius: inputVariant.styles.borderRadius,
                    paddingX: inputVariant.styles.paddingX,
                    paddingY: inputVariant.styles.paddingY
                }
            }));
        }

        // Transform select variants
        if (clientData.component.select) {
            transformedData.component.select = clientData.component.select.map(selectVariant => ({
                name: selectVariant.name,
                styles: {
                    backgroundColor: selectVariant.styles.backgroundColor,
                    borderRadius: selectVariant.styles.borderRadius,
                    paddingY: selectVariant.styles.paddingY
                }
            }));
        }
    }

    // Return the transformed data in the server's expected format
    return transformedData;
};