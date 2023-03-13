<template>
    <div
        id="clock"
        class="inline"
    >
        <template v-if="finished">
            <slot></slot>
        </template>
        <template v-else>
            <time>{{ display }}</time>
        </template>
    </div>
</template>
<script>
import { DateTime, Duration } from 'luxon';

export default {
    name: 'SimpleTimer',
    props: {
        offset: { type: Number, default: 10 },
    },
    data() {
        return {
            now: DateTime.local().set({ milliseconds: 0 }),
            tick: null,
        };
    },
    computed: {
        remaining() {
            return this.end.diff(this.now).toObject();
        },
        display() {
            return Duration.fromObject(this.remaining).toFormat('hh:mm:ss');
        },
        finished() {
            return this.now >= this.end;
        },
        end() {
            return DateTime.local().set({ milliseconds: 0 }).plus({ minutes: this.offset });
        },
    },
    watch: {
        now() {
            if (this.finished) {
                clearInterval(this.tick);
            }
        },
    },
    mounted() {
        this.tick = setInterval(() => {
            this.now = DateTime.local().set({ milliseconds: 0 });
        }, 1000);
    },
};
</script>
