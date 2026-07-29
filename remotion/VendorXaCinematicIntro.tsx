import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export function VendorXaCinematicIntro() {
  const frame = useCurrentFrame();

  const cameraProgress = interpolate(frame, [0, 300], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const lightX = interpolate(
    frame,
    [0, 46, 96, 150, 205, 260, 300],
    [350, 545, 780, 1040, 1260, 1510, 1720],
    clamp,
  );
  const lightY = interpolate(
    frame,
    [0, 46, 96, 150, 205, 260, 300],
    [835, 705, 635, 510, 415, 300, 215],
    clamp,
  );
  const handoff = interpolate(frame, [278, 329], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const fogDrift = interpolate(frame, [0, 329], [-90, 110], clamp);
  const bloom = interpolate(frame % 36, [0, 18, 36], [0.34, 0.62, 0.34], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#05080d", overflow: "hidden" }}>
      <Img
        src={staticFile("motion/vendorxa-governance-landscape.png")}
        style={{
          position: "absolute",
          inset: -70,
          width: 2060,
          height: 1220,
          objectFit: "cover",
          objectPosition: "center",
          scale: interpolate(cameraProgress, [0, 1], [1.025, 1.17]),
          translate: interpolate(cameraProgress, [0, 1], ["0px 18px", "-52px -24px"]),
          filter: `brightness(${interpolate(
            cameraProgress,
            [0, 1],
            [0.92, 1.04],
          )}) contrast(1.06) saturate(1.04)`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(4,8,13,.78) 0%, rgba(4,8,13,.34) 36%, transparent 65%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: lightX - 145,
          top: lightY - 145,
          width: 290,
          height: 290,
          borderRadius: "50%",
          opacity: bloom,
          background:
            "radial-gradient(circle, rgba(66,246,224,.95) 0%, rgba(20,184,166,.32) 24%, rgba(20,184,166,0) 70%)",
          filter: "blur(14px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -260 + fogDrift,
          bottom: -250,
          width: 1360,
          height: 650,
          opacity: 0.38,
          background:
            "radial-gradient(ellipse, rgba(177,206,208,.24) 0%, rgba(85,118,122,.11) 36%, transparent 72%)",
          filter: "blur(55px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -160 - fogDrift * 0.32,
          top: 180,
          width: 1020,
          height: 460,
          opacity: 0.25,
          background:
            "radial-gradient(ellipse, rgba(198,220,220,.2) 0%, rgba(116,150,152,.08) 42%, transparent 74%)",
          filter: "blur(62px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 40,
          top: 40,
          width: 720,
          height: 440,
          opacity: interpolate(frame, [0, 220, 300], [0.3, 0.72, 0.9], clamp),
          background:
            "radial-gradient(circle, rgba(255,239,206,.34) 0%, rgba(234,204,147,.11) 25%, transparent 68%)",
          filter: "blur(12px)",
          mixBlendMode: "screen",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 58% 48%, transparent 38%, rgba(0,0,0,.22) 72%, rgba(0,0,0,.68) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `${handoff * 116}%`,
          opacity: handoff,
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(11,18,32,.13) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to top, #000 0%, #000 72%, rgba(0,0,0,.82) 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, #000 0%, #000 72%, rgba(0,0,0,.82) 88%, transparent 100%)",
        }}
      />
    </AbsoluteFill>
  );
}
