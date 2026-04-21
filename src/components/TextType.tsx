import {
  createElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode
} from 'react';
import { gsap } from 'gsap';
import './TextType.css';

type TextTypeProps = HTMLAttributes<HTMLElement> & {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number } | null;
  revealEffect?: 'blur' | 'fade' | 'none';
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  children?: ReactNode;
};

export default function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed = null,
  revealEffect = 'blur',
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps) {
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const generatedId = useId().replace(/:/g, '');
  const propId = typeof props.id === 'string' ? props.id : undefined;
  const observerTargetId = propId ?? `text-type-${generatedId}`;

  const textArray = useMemo(() => {
    const normalized = Array.isArray(text) ? text : [text];
    return normalized.length ? normalized : [''];
  }, [text]);

  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasStarted, setHasStarted] = useState(initialDelay <= 0);

  const getProcessedText = useCallback(
    (input: string) => (reverseMode ? input.split('').reverse().join('') : input),
    [reverseMode]
  );

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [typingSpeed, variableSpeed]);

  useEffect(() => {
    if (!startOnVisible) return;
    const target = document.getElementById(observerTargetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [observerTargetId, startOnVisible]);

  useEffect(() => {
    if (!isVisible || hasStarted || initialDelay <= 0) return;
    const delayTimer = window.setTimeout(() => setHasStarted(true), initialDelay);
    return () => window.clearTimeout(delayTimer);
  }, [hasStarted, initialDelay, isVisible]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return undefined;

    gsap.set(cursorRef.current, { opacity: 1 });
    const blinkTween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    return () => {
      blinkTween.kill();
    };
  }, [cursorBlinkDuration, showCursor]);

  useEffect(() => {
    if (!contentRef.current || !isVisible || !hasStarted) return;
    if (!displayedText) return;

    if (revealEffect === 'none') {
      gsap.set(contentRef.current, { filter: 'none', opacity: 1 });
      return;
    }

    if (revealEffect === 'fade') {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.86 },
        { opacity: 1, duration: 0.18, ease: 'power2.out', overwrite: 'auto' }
      );
      return;
    }

    gsap.fromTo(
      contentRef.current,
      { filter: 'blur(3px)', opacity: 0.78 },
      { filter: 'blur(0px)', opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' }
    );
  }, [displayedText, hasStarted, isVisible, revealEffect]);

  useEffect(() => {
    if (!isVisible || !hasStarted) return;

    const currentRawText = textArray[currentTextIndex] ?? '';
    const currentProcessedText = getProcessedText(currentRawText);
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isDeleting) {
      if (displayedText.length === 0) {
        timer = setTimeout(() => {
          if (onSentenceComplete) {
            onSentenceComplete(currentRawText, currentTextIndex);
          }

          if (!loop && currentTextIndex === textArray.length - 1) {
            setIsDeleting(false);
            return;
          }

          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }, 0);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentProcessedText.slice(0, Math.max(displayedText.length - 1, 0)));
        }, deletingSpeed);
      }
    } else if (displayedText.length < currentProcessedText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentProcessedText.slice(0, displayedText.length + 1));
      }, variableSpeed ? getRandomSpeed() : typingSpeed);
    } else {
      if (!loop && currentTextIndex === textArray.length - 1) return;
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    currentTextIndex,
    deletingSpeed,
    displayedText,
    getProcessedText,
    getRandomSpeed,
    hasStarted,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    textArray,
    typingSpeed,
    variableSpeed
  ]);

  const activeProcessedText = getProcessedText(textArray[currentTextIndex] ?? '');
  const shouldHideCursor = hideCursorWhileTyping && (displayedText.length < activeProcessedText.length || isDeleting);
  const currentTextColor = textColors.length ? textColors[currentTextIndex % textColors.length] : 'inherit';

  return createElement(
    Component,
    {
      ...props,
      id: observerTargetId,
      className: `text-type ${className}`.trim()
    },
    <span ref={contentRef} className="text-type__content" style={{ color: currentTextColor }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`.trim()}
      >
        {cursorCharacter}
      </span>
    )
  );
}
