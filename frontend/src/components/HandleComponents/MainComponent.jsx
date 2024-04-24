import React from 'react';
import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import spacingAtom from '../../../recoil/Spacing/Spacing.atom';
import radiusAtom from '../../../recoil/Radius/Radius.atom';
import colorsAtom from '../../../recoil/Colors/Colors.atom';
import componentVariantsAtom from '../../../recoil/components/Components.atom';
import ButtonInputs from './ButtonInputs';
import InputInputs from './InputInputs';
import SelectInputs from './SelectInputs';

const Components = () => {
    const [componentVariants] = useRecoilState(componentVariantsAtom);
    const [selectedVariant, setSelectedVariant] = React.useState(null);

    // Function to handle selecting a variant for preview
    const handleSelectVariant = (variant) => {
        setSelectedVariant(variant);
    };

    return (
        <Box display="flex">
            {/* Main section with child components */}
            <Box flex="1" p={4}>
                <h1>Components</h1>

                {/* Child components */}
                <ButtonInputs handleSelectVariant={handleSelectVariant} />
                <InputInputs handleSelectVariant={handleSelectVariant} />
                <SelectInputs handleSelectVariant={handleSelectVariant} />

            </Box>

            {/* Preview section */}
            <Box flex="0.5" p={4} borderLeft="1px solid #ddd">
                <h2>Preview</h2>
                {/* Display the preview of the selected component variant */}
                {selectedVariant && (
                    <div style={selectedVariant.styles}>
                        <p>{selectedVariant.name}</p>
                        {/* Add more preview details as needed */}
                    </div>
                )}
            </Box>
        </Box>
    );
};

export default Components;
