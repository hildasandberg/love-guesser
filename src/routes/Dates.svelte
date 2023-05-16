<script lang="ts">
    import {Motion,useSpring, useMotionTemplate} from "svelte-motion";
    import { tick } from "svelte";

    export let height = 60;
    export let width = 2 * height;
    export let labels: any = undefined;
    export let range: any = undefined;
    export let selected: any;
    export let classes = "";
    export let springProps = { damping: 115, stiffness: 600, mass: 8 };

    // store the pan information into a motion value

    const y = useSpring(0, springProps);
    const yt = useMotionTemplate`calc(${y}px - 50%)`;

    // save where the motion value started in onPanStart
    let panoffset = 0;
    const onPanStart = () => (panoffset = y.get());

    // called onPan:
    const setY = (e, info) => {
        const offset = info.offset.y;
        const yy = Math.sign(offset) * Math.pow(Math.abs(offset), 1.1);
        y.set(yy + panoffset);
    };

    // called on panEnd
    const clampToClosest = (e,info) => {
        const target = Math.round((y.get() + info.velocity.y ) / height);
        // selectedIndex needs to change
        selectedIndex = -target + 1;
        selectedIndex = -target;
        selected = visibleLabels(selectedIndex)[1].label;
    };

    // helper to keep inside range/array
    const moduloIn = (i, length) => {
        const j = i % length;
        return j < 0 ? j + length : j;
    };

    // find closest selected Index
    const getSelectedIndex = (labels, selected) => {
        let index =
            (labels.findRangeIndex
                ? labels.findRangeIndex(selected)
                : labels.findIndex((v) => v === selected)) || 0;
        if (!selectedIndex) {
            return index;
        }
        while (selectedIndex - index > labels.length / 2) {
            index += labels.length;
        }
        while (index - selectedIndex > labels.length / 2) {
            index -= labels.length;
        }
        return index;
    };

    // force to reset spring motion value when the range changes
    let force = false;

    const getLabels = (labels, range) => {
        //simple case if labels are suppied as array
        if (labels !== undefined) {
            const labs = labels;
            labs.get = (i) => labels[moduloIn(i, labels.length)];
            return labs;
        }

        // range case
        const newLabels = {
            length: range?.to - range?.from + 1,
            findRangeIndex: (i) => {
                // check if currently selected value is in range
                if (i > range?.to || i < range?.from) {
                    return -1;
                }
                return i - range?.from;
            },
            get: (i) => moduloIn(i, range?.to - range?.from + 1) + range?.from,
        };
        const index = newLabels.findRangeIndex(selected);

        if (index >= 0) {
            selectedIndex = index;
            force = true;
        } else {
            selected = newLabels.get(selectedIndex);
        }

        return newLabels;
    };

    let _labels = getLabels(labels, range);
    $: _labels = getLabels(labels, range);

    $: selectedIndex = getSelectedIndex(_labels, selected);

    // only three labels are mounted per time
    const visibleLabels = (l) => {
        const p = _labels.get(l - 1);
        const c = _labels.get(l);
        const n = _labels.get(l + 1);

        return [
            { label: p, i: l - 1 },
            { label: c, i: l },
            { label: n, i: l + 1 },
        ];
    };

    let visible = [],
        vis = selectedIndex;

    const forceset = () => {
        // little bit ugly workaround
        y.updateAndNotify(-selectedIndex * height,true);
        tick().then(_=>{force = false;y.updateAndNotify(-selectedIndex * height,true)})
    };
    $: force ? forceset() : y.set(-selectedIndex * height);
    $: vis = Math.round((-$y || 0) / height);
    $: visible = visibleLabels(vis, range);
</script>

<div class="Dates">
<Motion let:motion={outer} {onPanStart} onPan={setY} onPanEnd={clampToClosest}>
    <div
        class={"outer unselectable " + classes}
        style={"height:" + height + "px;width:" + width + "px;"}
        use:outer
    >
        {#each visible as label (label.i)}
            <Motion let:motion={inner} style={{ y: yt, x: "-50%" }}>
                <div
                    class="inner unselectable"
                    use:inner
                    style={"top:calc(50% + " + height * label.i + "px)"}
                    draggable="false"
                >
                    {label.label}
                </div>
            </Motion>
        {/each}
    </div>
</Motion>
</div>
<style>
    .outer {
        overflow: hidden;
        position: relative;
        touch-action: none;
    }
    .inner {
        position: absolute;
        left: 50%;
        pointer-events: none;
    }
    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>