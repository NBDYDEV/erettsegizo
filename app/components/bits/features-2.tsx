"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Shield, Lock, Eye } from "lucide-react";

export interface FeatureItem {
  title: string;
  icon: any;
  image: string;
  card: {
    title: string;
    items: {
      label: string;
      status: string;
      time?: string;
    }[];
  };
}

export interface Features2Props {
  features?: FeatureItem[];
  badge?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    title: "Automate work",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1632085912795-37e28d891fe2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    card: {
      title: "Security Dashboard",
      items: [
        {
          label: "Threat detected in Network A",
          status: "Critical",
          time: "2 min ago",
        },
        {
          label: "Firewall update required",
          status: "Warning",
          time: "15 min ago",
        },
        {
          label: "Security scan completed",
          status: "Success",
          time: "1 hour ago",
        },
      ],
    },
  },
  {
    title: "Stay in control",
    icon: Lock,
    image:
      "https://images.unsplash.com/photo-1723900742674-405bdd7757d9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    card: {
      title: "Access Control",
      items: [
        {
          label: "Admin privileges updated",
          status: "Active",
          time: "5 min ago",
        },
        {
          label: "New user authentication",
          status: "Pending",
          time: "12 min ago",
        },
        {
          label: "Password policy enforced",
          status: "Complete",
          time: "2 hours ago",
        },
      ],
    },
  },
  {
    title: "Surface new insights",
    icon: Eye,
    image:
      "https://images.unsplash.com/photo-1506787497326-c2736dde1bef?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    card: {
      title: "Analytics Monitor",
      items: [
        {
          label: "Traffic spike detected",
          status: "Review",
          time: "3 min ago",
        },
        {
          label: "Unusual login patterns",
          status: "Alert",
          time: "20 min ago",
        },
        {
          label: "System health optimal",
          status: "Normal",
          time: "45 min ago",
        },
      ],
    },
  },
];

export function Features2({ features = DEFAULT_FEATURES, badge, title, description }: Features2Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [features.length]);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    }
  };

  return (
    <section className="w-full bg-transparent">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col lg:pr-8 xl:pr-12">
            {/* Header */}
            {(badge || title || description) && (
              <div className="mb-8 md:mb-12 flex flex-col items-center lg:items-start text-center lg:text-left">
                {badge && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4"
                  >
                    {badge}
                  </motion.p>
                )}

                {title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-6 text-black"
                  >
                    {title}
                  </motion.div>
                )}

                {description && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-base font-poppins-semib sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0"
                  >
                    {description}
                  </motion.div>
                )}
              </div>
            )}

            {/* Separator */}
            {(badge || title || description) && <div className="w-full lg:w-[calc(100%+3rem)] xl:w-[calc(100%+4rem)] h-px bg-neutral-200 dark:bg-neutral-800 mb-8" />}

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => handleFeatureClick(index)}
                    className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg transition-[background-color] duration-200 ${isActive
                      ? "bg-neutral-100 dark:bg-neutral-900"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-400 dark:text-neutral-600"
                        }`}
                    />
                    <span
                      className={`text-base sm:text-lg font-medium transition-colors duration-200 ${isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-600 dark:text-neutral-400"
                        }`}
                    >
                      {feature.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Image with Overlay Card */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 max-h-[650px]"
            >
              {/* Background Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={features[activeIndex].image}
                  alt="Background"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30"
                />
              </AnimatePresence>

              {/* Overlay Card - Vertical Marquee */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2.5 flex items-center justify-center">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeIndex}
                      initial={{ y: "250%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-250%" }}
                      transition={{
                        duration: 1.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="w-[90%] max-w-sm md:max-w-md absolute mx-auto"
                    >
                      {/* Glass Container */}
                      <div className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/20">
                        {/* Card Title */}
                        <h3 className="text-lg md:text-xl font-poppins-bold text-black dark:text-white mb-4">
                          {features[activeIndex].card.title}
                        </h3>

                        {/* Card Items */}
                        <div className="space-y-3">
                          {features[activeIndex].card.items.map(
                            (item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start justify-between gap-3 py-2"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-[0.95rem] md:text-base font-poppins-med text-black dark:text-white/90">
                                    {item.label}
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
