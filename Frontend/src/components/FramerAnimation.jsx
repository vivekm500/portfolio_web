import React, { useEffect, useMemo, useRef, useState } from "react";

const FramerAnimation = ({
  backgroundColor = "#0A0A0A",
  dotColor = "#71717A",
  dotSize = 3,
  spacing = 55,
  proximityRadius = 160,
  maxOpacity = 0.9,
  backgroundOpacity = 0.12,
  gridType = "dots-lines",
  fadeDelay = 0,
  thickness = 1,
  hoverDarken = 0.3,
  showBackground = true,
}) => {
  const containerRef = useRef(null);

  const [mousePos, setMousePos] = useState({
    x: -1000,
    y: -1000,
  });

  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600,
  });

  const [fadingDots, setFadingDots] = useState(new Map());

  const activeDotsRef = useRef(new Set());

  /*
   * Get container dimensions
   */
  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      const { width, height } = entry.contentRect;

      setDimensions({
        width,
        height,
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Track mouse position
   */
  useEffect(() => {
    const handleMouseMove = (event) => {
      const element = containerRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();

      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /*
   * Generate dots
   */
  const dots = useMemo(() => {
    const dotsArray = [];

    const cols = Math.ceil(dimensions.width / spacing);

    const rows = Math.ceil(dimensions.height / spacing);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + spacing / 2;

        const y = row * spacing + spacing / 2;

        dotsArray.push({
          x,
          y,
          key: `${col}-${row}`,
        });
      }
    }

    return dotsArray;
  }, [dimensions.width, dimensions.height, spacing]);

  /*
   * Calculate opacity based on
   * distance from mouse
   */
  const getOpacity = (dotX, dotY) => {
    const distance = Math.sqrt(
      Math.pow(mousePos.x - dotX, 2) + Math.pow(mousePos.y - dotY, 2),
    );

    if (distance > proximityRadius) {
      return backgroundOpacity;
    }

    const hoverOpacity = (1 - distance / proximityRadius) * maxOpacity;

    return Math.max(backgroundOpacity, hoverOpacity);
  };

  /*
   * Track dots that are currently
   * inside mouse proximity
   */
  useEffect(() => {
    if (fadeDelay === 0) return;

    const newActiveDots = new Set();

    dots.forEach((dot) => {
      const distance = Math.sqrt(
        Math.pow(mousePos.x - dot.x, 2) + Math.pow(mousePos.y - dot.y, 2),
      );

      if (distance <= proximityRadius) {
        newActiveDots.add(dot.key);
      }
    });

    const previousActive = activeDotsRef.current;

    const dotsToFade = Array.from(previousActive).filter(
      (key) => !newActiveDots.has(key),
    );

    if (dotsToFade.length > 0) {
      const startTime = Date.now();

      setFadingDots((previous) => {
        const next = new Map(previous);

        dotsToFade.forEach((key) => {
          if (!next.has(key)) {
            next.set(key, startTime);
          }
        });

        return next;
      });
    }

    activeDotsRef.current = newActiveDots;
  }, [mousePos, dots, proximityRadius, fadeDelay]);

  /*
   * Fade animation
   */
  useEffect(() => {
    if (fadeDelay === 0 || fadingDots.size === 0) {
      return;
    }

    let animationFrame;

    const animate = () => {
      const now = Date.now();

      setFadingDots((previous) => {
        const next = new Map(previous);

        previous.forEach((startTime, key) => {
          const elapsed = now - startTime;

          if (elapsed >= fadeDelay) {
            next.delete(key);
          }
        });

        return next;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [fadingDots.size, fadeDelay]);

  /*
   * Get opacity including fade
   */
  const getOpacityWithDelay = (dotX, dotY, dotKey) => {
    const distance = Math.sqrt(
      Math.pow(mousePos.x - dotX, 2) + Math.pow(mousePos.y - dotY, 2),
    );

    if (distance <= proximityRadius) {
      const hoverOpacity = (1 - distance / proximityRadius) * maxOpacity;

      return Math.max(backgroundOpacity, hoverOpacity);
    }

    if (fadeDelay > 0 && fadingDots.has(dotKey)) {
      const startTime = fadingDots.get(dotKey);

      const elapsed = Date.now() - startTime;

      const progress = Math.min(elapsed / fadeDelay, 1);

      const fadingOpacity = maxOpacity * (1 - progress);

      return Math.max(backgroundOpacity, fadingOpacity);
    }

    return backgroundOpacity;
  };

  /*
   * Get color + opacity
   */
  const getColorWithHover = (dotX, dotY, dotKey) => {
    const opacity =
      fadeDelay > 0
        ? getOpacityWithDelay(dotX, dotY, dotKey)
        : getOpacity(dotX, dotY);

    if (opacity > backgroundOpacity) {
      const denominator = maxOpacity - backgroundOpacity;

      const hoverAmount =
        denominator > 0 ? (opacity - backgroundOpacity) / denominator : 0;

      return {
        color: dotColor,
        opacity: opacity + hoverAmount * hoverDarken,
      };
    }

    return {
      color: dotColor,
      opacity,
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        minWidth: 100,
        minHeight: 100,
        backgroundColor: showBackground ? backgroundColor : "transparent",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Grid lines */}

      {(gridType === "dots-lines" ||
        gridType === "lines" ||
        gridType === "plus-lines") && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Vertical lines */}

          {Array.from({
            length: Math.ceil(dimensions.width / spacing),
          }).map((_, index) => {
            const x = index * spacing + spacing / 2;

            return (
              <line
                key={`v-${index}`}
                x1={x}
                y1={0}
                x2={x}
                y2={dimensions.height}
                stroke={dotColor}
                strokeWidth={1}
                opacity={backgroundOpacity}
              />
            );
          })}

          {/* Horizontal lines */}

          {Array.from({
            length: Math.ceil(dimensions.height / spacing),
          }).map((_, index) => {
            const y = index * spacing + spacing / 2;

            return (
              <line
                key={`h-${index}`}
                x1={0}
                y1={y}
                x2={dimensions.width}
                y2={y}
                stroke={dotColor}
                strokeWidth={1}
                opacity={backgroundOpacity}
              />
            );
          })}
        </svg>
      )}

      {/* Dots */}

      {(gridType === "dots-lines" || gridType === "dots") &&
        dots.map((dot) => {
          const opacity =
            fadeDelay > 0
              ? getOpacityWithDelay(dot.x, dot.y, dot.key)
              : getOpacity(dot.x, dot.y);

          return (
            <div
              key={dot.key}
              style={{
                position: "absolute",

                left: dot.x,
                top: dot.y,

                width: dotSize,
                height: dotSize,

                borderRadius: "50%",

                backgroundColor: dotColor,

                opacity,

                transform: "translate(-50%, -50%)",

                transition: "opacity 0.15s ease-out",

                pointerEvents: "none",
              }}
            />
          );
        })}

      {/* Plus symbols */}

      {(gridType === "plus" || gridType === "plus-lines") &&
        dots.map((dot) => {
          const { color, opacity } = getColorWithHover(dot.x, dot.y, dot.key);

          const plusSize = dotSize * 2;

          const halfThickness = thickness / 2;

          return (
            <svg
              key={dot.key}
              style={{
                position: "absolute",

                left: dot.x,
                top: dot.y,

                width: plusSize,
                height: plusSize,

                opacity,

                transform: "translate(-50%, -50%)",

                pointerEvents: "none",
              }}
            >
              <path
                d={`
                  M ${plusSize / 2 - halfThickness} 0

                  L ${plusSize / 2 + halfThickness} 0

                  L ${plusSize / 2 + halfThickness} ${
                    plusSize / 2 - halfThickness
                  }

                  L ${plusSize} ${plusSize / 2 - halfThickness}

                  L ${plusSize} ${plusSize / 2 + halfThickness}

                  L ${plusSize / 2 + halfThickness} ${
                    plusSize / 2 + halfThickness
                  }

                  L ${plusSize / 2 + halfThickness} ${plusSize}

                  L ${plusSize / 2 - halfThickness} ${plusSize}

                  L ${plusSize / 2 - halfThickness} ${
                    plusSize / 2 + halfThickness
                  }

                  L 0 ${plusSize / 2 + halfThickness}

                  L 0 ${plusSize / 2 - halfThickness}

                  L ${plusSize / 2 - halfThickness} ${
                    plusSize / 2 - halfThickness
                  }

                  Z
                `}
                fill={color}
              />
            </svg>
          );
        })}
    </div>
  );
};

export default FramerAnimation;
