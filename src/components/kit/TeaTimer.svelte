<script lang="ts">
  import Scrubber from './Scrubber.svelte';

  // Example only: shows how an essay wires a kit part to its own copy.
  const describe = (minutes: number) =>
    minutes < 3
      ? `${minutes} minutes: light and grassy.`
      : minutes < 5
        ? `${minutes} minutes: balanced, the way the label suggests.`
        : `${minutes} minutes: bitter. You walked away from it.`;
</script>

<Scrubber label="Steep" min={1} max={8} value={3} unit=" min" {describe} />
