<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <x-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <x-button>top-start</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <x-button>top</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <x-button>top-end</x-button>
      </x-tooltip>
    </div>
    <div class="row">
      <x-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <x-button>left-start</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <x-button>right-start</x-button>
      </x-tooltip>
    </div>
    <div class="row">
      <x-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <x-button class="mt-3 mb-3">left</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <x-button>right</x-button>
      </x-tooltip>
    </div>
    <div class="row">
      <x-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <x-button>left-end</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <x-button>right-end</x-button>
      </x-tooltip>
    </div>
    <div class="row center">
      <x-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <x-button>bottom-start</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <x-button>bottom</x-button>
      </x-tooltip>
      <x-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <x-button>bottom-end</x-button>
      </x-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>