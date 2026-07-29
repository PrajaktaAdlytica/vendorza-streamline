import { Composition } from "remotion";
import { VendorXaCinematicIntro } from "./VendorXaCinematicIntro";

export function RemotionRoot() {
  return (
    <Composition
      id="VendorXaCinematicIntro"
      component={VendorXaCinematicIntro}
      durationInFrames={330}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
