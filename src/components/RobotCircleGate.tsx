"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './RobotCircleGate.module.css';

const RobotCircleGate = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const hasTriggeredScroll = useRef(false);

    // This effect "unlocks" audio and handles scroll intersection
    useEffect(() => {
        const unlock = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('click', unlock);
        window.addEventListener('touchstart', unlock);

        // Intersection Observer for scroll triggers
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsActive(true);
                    if (!hasTriggeredScroll.current) {
                        playHoverSound();
                        hasTriggeredScroll.current = true;
                    }
                } else {
                    setIsActive(false);
                    hasTriggeredScroll.current = false;
                }
            },
            { threshold: 0.6 } // Trigger when 60% in view
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const playHoverSound = async () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            // Create a "Cuter & Softer" Swipe Sound
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            // Tonal "Ping-Whoosh" (Lowered Pitch)
            osc.type = 'sine'; // Softest possible wave
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.2); // Deeper upward slide

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25);

            // Soft envelope: Slow attack, quick fade
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05); // Low volume
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        } catch (e) {
            console.error("Audio failed:", e);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div 
                ref={containerRef}
                className={`${styles.container} ${isActive ? styles.active : ''}`} 
                onMouseEnter={playHoverSound}
            >
                {/* The 5 Concentric Circles */}
                <div className={`${styles.circle} ${styles.circle5}`} />
                <div className={`${styles.circle} ${styles.circle4}`} />
                <div className={`${styles.circle} ${styles.circle3}`} />
                <div className={`${styles.circle} ${styles.circle2}`} />
                <div className={`${styles.circle} ${styles.circle1}`}>
                    <div className={`${styles.innerLabel} hidden lg:block`}>
                        Talk to our <br /> AI agent
                    </div>
                </div>

                {/* The Robot Character */}
                <div className={styles.robotWrapper}>
                    <Image
                        src="/assets/hero_img3.png"
                        alt="AI Robot Consultant"
                        width={600}
                        height={600}
                        priority
                        className="object-contain"
                    />
                </div>
            </div>
            
            {/* Mobile Label Below Animation */}
            <div className="lg:hidden mt-8 text-center text-sm font-bold uppercase tracking-widest text-primary animate-pulse">
                Talk to our AI agent
            </div>
        </div>
    );
};

export default RobotCircleGate;
