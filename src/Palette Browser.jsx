import { useAtomValue } from 'jotai';
import { a_has_benchmarks, a_has_compare, a_has_targets, a_selected_tab } from './atoms';
import { BENCHMARKS, COMPARE, DARK_BLUE, GREEN, RED, TANGERINE, TARGETS, YELLOW } from './const';
import _ from 'lodash';
import { useTooltip } from './Tooltip';
import { useChangePalette } from './hooks';

const PaletteBrowser = () => {
    const tab = useAtomValue(a_selected_tab);
    const hasTargets = useAtomValue(a_has_targets);
    const hasCompare = useAtomValue(a_has_compare);
    const hasBenchmarks = useAtomValue(a_has_benchmarks);
    const tooltip = useTooltip();
    const changePalette = useChangePalette();

    if (tab === TARGETS && !hasTargets) {
        return null;
    }

    if (tab === COMPARE && !hasCompare) {
        return null;
    }

    if (tab === BENCHMARKS && !hasBenchmarks) {
        return null;
    }

    return <div className='palette-switch' onClick={e => changePalette(e.shiftKey)}
        onMouseEnter={(e) => tooltip.show({ e, text: 'Browse grid palettes.\nHold Shift to navigate backwards.', dx: 12, dy: -55 })}
        onMouseLeave={tooltip.hide}>
        {_.map([RED, TANGERINE, YELLOW, GREEN, DARK_BLUE,], (background, i) => {
            const size = 20 - i * 3.5;
            return <div key={i} style={{
                gridArea: '1/1', width: `${size}px`, height: `${size}px`, borderRadius: `0 ${size}px 0 0`,
                background, placeSelf: 'end start'
            }} />;
        }
        )}
    </div>;
};

export default PaletteBrowser;
