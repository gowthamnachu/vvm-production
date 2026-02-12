"use client";

import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    speed?: number; // Deprecated but kept for compatibility
    image?: string;
    imageAlt?: string; // Kept for compatibility
    mobileImage?: string;
}

export function ParallaxBackground({
    children,
    className,
    image,
    mobileImage,
    imageAlt,
    speed,
    ...props
}: ParallaxBackgroundProps) {
    return (
        <div
            className={cn("absolute inset-0 z-0", className)}
            {...props}
        >
            {image ? (
                <>
                    {/* Mobile Background: usually 'fixed' doesn't work well on mobile, so we use 'scroll' or default */}
                    <div
                        className="absolute inset-0 bg-center bg-cover bg-no-repeat sm:hidden"
                        style={{
                            backgroundImage: `url('${mobileImage || image}')`,
                        }}
                    />

                    {/* Desktop Background: Fixed attachment */}
                    <div
                        className="hidden sm:block absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed"
                        style={{
                            backgroundImage: `url('${image}')`,
                        }}
                    />

                    {/* Overlay Content */}
                    <div className="relative h-full w-full">
                        {children}
                    </div>
                </>
            ) : (
                /* Fallback for non-image backgrounds (e.g. Video) - just render children normally 
                   Functionally this disables the "fixed" effect for videos unless manually handled,
                   which matches the standard "CSS Parallax" scope of separate background images.
                */
                children
            )}
        </div>
    );
}
