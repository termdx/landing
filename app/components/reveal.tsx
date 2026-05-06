"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`transition-opacity transition-transform duration-500 ease-out ${className}`}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0)" : "translateY(12px)",
				willChange: visible ? "auto" : "opacity, transform",
			}}
		>
			{children}
		</div>
	);
}
