import type { Ref } from "vue";

export interface FullScreenContainerProps {
  baseWidth?: number;
}

export interface FullScreenContainerInstance {
  isFullscreen: Ref<boolean>;
  enter: () => void;
  exit: () => void;
  scaleValue: Ref<number>;
}
