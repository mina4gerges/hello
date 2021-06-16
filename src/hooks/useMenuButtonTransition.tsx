import { useEffect, useState, useRef } from "react";
import { easeElasticIn, easeElasticOut, easeBounceOut } from "d3-ease";
import Segment from "segment-js";

const beginAC = 80;
const endAC = 320;
const beginB = 80;
const endB = 320;

const useMenuButtonTransition = () => {
  const pathA = useRef<SVGPathElement>(null);
  const pathB = useRef<SVGPathElement>(null);
  const pathC = useRef<SVGPathElement>(null);

  const [segmentA, setSegmentA] = useState();
  const [segmentB, setSegmentB] = useState();
  const [segmentC, setSegmentC] = useState();
  const [toCloseIcon, setToCloseIcon] = useState(true);

  const elasticIn = easeElasticIn.amplitude(1).period(0.3);
  const elasticOut = easeElasticOut.amplitude(1).period(0.3);
  const bounceOut = easeBounceOut;

  function inAC(s: any) {
    s.draw("80% - 240", "80%", 0.3, {
      delay: 0.1,
      callback: function() {
        inAC2(s);
      }
    });
  }

  function inAC2(s: any) {
    s.draw("100% - 545", "100% - 305", 0.6, {
      easing: elasticOut
    });
  }

  function inB(s: any) {
    s.draw(beginB - 60, endB + 60, 0.1, {
      callback: function() {
        inB2(s);
      }
    });
  }

  function inB2(s: any) {
    s.draw(beginB + 120, endB - 120, 0.3, {
      easing: bounceOut
    });
  }

  /* Out animations (to burger icon) */

  function outAC(s: any) {
    s.draw("90% - 240", "90%", 0.1, {
      easing: elasticIn,
      callback: function() {
        outAC2(s);
      }
    });
  }

  function outAC2(s: any) {
    s.draw("20% - 240", "20%", 0.3, {
      callback: function() {
        outAC3(s);
      }
    });
  }

  function outAC3(s: any) {
    s.draw(beginAC, endAC, 0.7, {
      easing: elasticOut
    });
  }

  function outB(s: any) {
    s.draw(beginB, endB, 0.7, {
      delay: 0.1,
      easing: elasticOut
    });
  }

  const triggerTransition = () => {
    if (toCloseIcon) {
      inAC(segmentA);
      inB(segmentB);
      inAC(segmentC);
    } else {
      outAC(segmentA);
      outB(segmentB);
      outAC(segmentC);
    }
    setToCloseIcon(prevState => !prevState);
  };

  useEffect(() => {
    if (pathA && pathA.current) {
      setSegmentA(new Segment(pathA.current, beginAC, endAC));
    }
    if (pathB && pathB.current) {
      setSegmentB(new Segment(pathB.current, beginB, endB));
    }
    if (pathC && pathC.current) {
      setSegmentC(new Segment(pathC.current, beginAC, endAC));
    }
  }, [pathA, pathB, pathC]);

  return {
    pathA: pathA,
    pathB: pathB,
    pathC: pathC,
    triggerTransition: triggerTransition
  };
};

export default useMenuButtonTransition;
