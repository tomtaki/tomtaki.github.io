<script lang="ts">
  // A number the reader can drag or arrow-key through, with a sentence that
  // updates as it changes. The smallest "reach in and move it" interaction.
  interface Props {
    label: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    unit?: string;
    describe?: (value: number) => string;
  }

  let { label, min = 0, max = 100, step = 1, value = 50, unit = '', describe }: Props = $props();
</script>

<div class="scrubber">
  <label>
    <span>{label}</span>
    <input type="range" {min} {max} {step} bind:value />
    <output>{value}{unit}</output>
  </label>
  {#if describe}
    <p aria-live="polite">{describe(value)}</p>
  {/if}
</div>

<style>
  label {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
  }

  input {
    accent-color: var(--accent);
    width: 100%;
  }

  output {
    font-variant-numeric: tabular-nums;
    min-width: 3.5em;
    text-align: right;
  }

  p {
    font-family: var(--font-serif);
    margin: 0.9rem 0 0;
  }
</style>
